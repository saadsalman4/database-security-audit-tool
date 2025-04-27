const { Sequelize, DataTypes } = require('sequelize');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const { auditSqlDatabase } = require('../services/SQLScan');
const { auditMongoDatabase } = require('../services/MongoScan');

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


module.exports = { sqlScan, mongoScan };