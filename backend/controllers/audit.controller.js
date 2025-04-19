const { Sequelize, DataTypes } = require('sequelize');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

async function sqlScan(req, res) {
  const { host, username, password='', database, dialect } = req.body;

  if (!host || !username || !database || !dialect) {
    return res.status(400).json({ error: 'Missing required database connection parameters' });
  }

  let sequelize;
  try {
    // Establish database connection
    sequelize = new Sequelize(database, username, password, {
      host: host,
      dialect: dialect, // mysql, postgres, mariadb, mssql
      logging: false
    });

    // Test connection
    await sequelize.authenticate();
    console.log('Connection established successfully.');

    // Start audit process
    const auditResults = await auditSqlDatabase(sequelize);
    
    return res.json({ success: true, results: auditResults });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    return res.status(500).json({ error: 'Database connection failed', details: error.message });
  } finally {
    if (sequelize) {
      await sequelize.close();
    }
  }
}

async function auditSqlDatabase(sequelize) {
  const results = {
    vulnerabilities: [],
    risks: [],
    recommendations: []
  };

  try {
    // 1. Check for weak table schemas (missing primary keys)
    const [tables] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = '${sequelize.config.database}'
    `);

    for (const table of tables) {
      const tableName = table.table_name || table.TABLE_NAME;
      
      // Check for primary keys
      const [primaryKeys] = await sequelize.query(`
        SELECT column_name
        FROM information_schema.key_column_usage
        WHERE table_schema = '${sequelize.config.database}'
        AND table_name = '${tableName}'
        AND constraint_name = 'PRIMARY'
      `);

      if (primaryKeys.length === 0) {
        results.vulnerabilities.push({
          type: 'schema',
          severity: 'medium',
          description: `Table '${tableName}' has no primary key defined`,
          recommendation: 'Add a primary key to the table to ensure data integrity'
        });
      }
      
      // Check for indexes on frequently queried columns
      const [indexes] = await sequelize.query(`
        SHOW INDEX FROM ${tableName}
      `).catch(() => [[]]);
      
      if (indexes.length <= 1) { // Only primary key index or no indexes
        results.risks.push({
          type: 'performance',
          severity: 'low',
          description: `Table '${tableName}' might lack proper indexing`,
          recommendation: 'Review query patterns and add indexes to frequently queried columns'
        });
      }
    }

    // 2. Check user privileges (look for overprivileged users)
    const [users] = await sequelize.query(`
      SELECT user, host 
      FROM mysql.user 
      WHERE Super_priv = 'Y' OR Grant_priv = 'Y'
    `).catch(() => [[]]);
    
    if (users.length > 0) {
      results.vulnerabilities.push({
        type: 'privilege',
        severity: 'high',
        description: 'Users with SUPER or GRANT privileges detected',
        details: users.map(u => `${u.user}@${u.host}`),
        recommendation: 'Review and revoke unnecessary privileges from users'
      });
    }

    // 3. Check database settings
    if (sequelize.options.dialect === 'mysql') {
      const [variables] = await sequelize.query(`SHOW VARIABLES LIKE '%password%'`);
      const passwordValidation = variables.find(v => 
        v.Variable_name === 'validate_password_policy' || 
        v.Variable_name === 'validate_password.policy'
      );
      
      if (!passwordValidation || passwordValidation.Value === 'LOW') {
        results.risks.push({
          type: 'security',
          severity: 'medium',
          description: 'Weak password policy configured',
          recommendation: 'Set password policy to MEDIUM or STRONG'
        });
      }
    }

    // Add general recommendations
    results.recommendations.push(
      'Implement regular backups and test restoration procedures',
      'Enable SSL/TLS for database connections',
      'Sanitize user inputs to prevent SQL injection',
      'Use parameterized queries instead of string concatenation'
    );

    return results;
  } catch (error) {
    console.error('Error during SQL database audit:', error);
    return {
      error: 'Audit process failed',
      details: error.message,
      partial_results: results
    };
  }
}

async function mongoScan(req, res){
  const { host, username, password, database } = req.body;
  
  if (!host || !database) {
    return res.status(400).json({ error: 'Missing required MongoDB connection parameters' });
  }

  let client;
  try {
    // Construct MongoDB connection URI
    const uri = username && password 
      ? `mongodb://${username}:${password}@${host}/${database}`
      : `mongodb://${host}/${database}`;
      
    client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    
    console.log('MongoDB connection established successfully');
    
    // Start audit process
    const auditResults = await auditMongoDatabase(client, database);
    
    return res.json({ success: true, results: auditResults });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    return res.status(500).json({ error: 'MongoDB connection failed', details: error.message });
  } finally {
    if (client) {
      await client.close();
    }
  }

}


async function auditMongoDatabase(client, databaseName) {
  const results = {
    vulnerabilities: [],
    risks: [],
    recommendations: []
  };

  try {
    const db = client.db(databaseName);
    
    // 1. Check MongoDB version for known vulnerabilities
    const buildInfo = await db.admin().buildInfo();
    const version = buildInfo.version;
    
    // Check for old MongoDB versions
    const [major, minor] = version.split('.').map(Number);
    if (major < 4) {
      results.vulnerabilities.push({
        type: 'version',
        severity: 'high',
        description: `MongoDB version ${version} is outdated`,
        recommendation: 'Upgrade to MongoDB 4.4 or later for security improvements'
      });
    }
    
    // 2. Check authentication mode
    const runCommand = await db.admin().command({ getParameter: 1, authenticationMechanisms: 1 })
      .catch(() => ({ authenticationMechanisms: ['NONE'] }));
    
    if (!runCommand.authenticationMechanisms || 
        runCommand.authenticationMechanisms.includes('NONE')) {
      results.vulnerabilities.push({
        type: 'authentication',
        severity: 'critical',
        description: 'MongoDB may be running without authentication',
        recommendation: 'Enable authentication and create proper user accounts'
      });
    }
    
    // 3. Check for collections without indexes
    const collections = await db.listCollections().toArray();
    
    for (const collection of collections) {
      const collName = collection.name;
      const indexes = await db.collection(collName).indexes();
      
      if (indexes.length <= 1) { // Only _id index or no indexes
        results.risks.push({
          type: 'performance',
          severity: 'medium',
          description: `Collection '${collName}' might lack proper indexing`,
          recommendation: 'Add indexes to frequently queried fields'
        });
      }
      
      // Check if collection might have unbounded growth
      if (['logs', 'audit', 'events', 'transactions'].some(term => 
          collName.toLowerCase().includes(term))) {
        results.risks.push({
          type: 'storage',
          severity: 'medium',
          description: `Collection '${collName}' may experience unbounded growth`,
          recommendation: 'Consider implementing a TTL index or archiving strategy'
        });
      }
    }
    
    // 4. Check for user roles and privileges
    try {
      const users = await db.admin().command({ usersInfo: 1 });
      
      if (users.users) {
        const adminUsers = users.users.filter(user => 
          user.roles.some(role => role.role === 'root' || role.role === 'userAdminAnyDatabase')
        );
        
        if (adminUsers.length > 2) {
          results.risks.push({
            type: 'privilege',
            severity: 'medium',
            description: 'Multiple users with administrative privileges detected',
            details: adminUsers.map(u => u.user),
            recommendation: 'Limit the number of administrator users'
          });
        }
      }
    } catch (error) {
      // May not have permission to check users
      results.risks.push({
        type: 'audit_limitation',
        severity: 'low',
        description: 'Could not verify user privileges',
        recommendation: 'Run audit with administrative privileges for complete results'
      });
    }

    // Add MongoDB-specific recommendations
    results.recommendations.push(
      'Use MongoDB Atlas or enable security features available in your version',
      'Implement field-level encryption for sensitive data',
      'Configure network security with IP whitelisting',
      'Set up automated backups with point-in-time recovery'
    );

    return results;
  } catch (error) {
    console.error('Error during MongoDB audit:', error);
    return {
      error: 'Audit process failed',
      details: error.message,
      partial_results: results
    };
  }
}

module.exports = { sqlScan, mongoScan };