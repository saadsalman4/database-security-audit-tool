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

module.exports={auditSqlDatabase}