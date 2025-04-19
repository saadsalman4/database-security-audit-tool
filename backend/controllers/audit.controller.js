const { Sequelize, QueryTypes } = require("sequelize");

async function scan(req, res) {
  const { dialect, host, database, username, password } = req.body;

  if (!dialect || !host || !database || !username ) {
    return res.status(400).json({ success: false, error: "All fields are required" });
  }

  try {
    const sequelize = new Sequelize(database, username, password, {
      host: host,
      dialect: dialect,
      logging: false,
    });

    await sequelize.authenticate(); // Test connection
    console.log("Database connected!");
    
    let auditResults = [];
    
    try {
      // Check for Weak Passwords (MySQL Only)
      if (dialect === "mysql") {
        const users = await sequelize.query("SELECT user, authentication_string FROM mysql.user", { type: QueryTypes.SELECT });
        const weakPasswords = users.filter(user => !user.authentication_string || user.authentication_string.length < 10);
        
        if (weakPasswords.length > 0) {
          auditResults.push({
            issue: `Found ${weakPasswords.length} user(s) with weak or empty passwords`,
            severity: "High",
            recommendation: "Set strong passwords for all database users"
          });
        }
      }

      // Check for Excessive Privileges (MySQL Only)
      if (dialect === "mysql") {
        try {
          const privileges = await sequelize.query("SELECT * FROM information_schema.user_privileges", { type: QueryTypes.SELECT });
          const excessivePrivileges = privileges.filter(p => p.PRIVILEGE_TYPE === "ALL PRIVILEGES");
          
          if (excessivePrivileges.length > 0) {
            auditResults.push({
              issue: `Found ${excessivePrivileges.length} user(s) with excessive privileges`,
              severity: "Medium",
              recommendation: "Apply least privilege principle to database users"
            });
          }
        } catch (error) {
          console.error("Error checking privileges:", error);
        }
      }

      // Check for Dormant Users (MySQL Only)
      if (dialect === "mysql") {
        try {
          const inactiveUsers = await sequelize.query("SELECT user FROM mysql.user WHERE user NOT IN (SELECT user FROM mysql.db)", { type: QueryTypes.SELECT });
          
          if (inactiveUsers.length > 0) {
            auditResults.push({
              issue: `Found ${inactiveUsers.length} potentially dormant user(s)`,
              severity: "Low",
              recommendation: "Review and remove unused database accounts"
            });
          }
        } catch (error) {
          console.error("Error checking dormant users:", error);
        }
      }

      // Check for Missing Indexes (Both MySQL & PostgreSQL with dialect-specific queries)
      try {
        let indexesQuery;
        if (dialect === "mysql") {
          indexesQuery = "SELECT TABLE_NAME, COUNT(*) as index_count FROM INFORMATION_SCHEMA.STATISTICS GROUP BY TABLE_NAME";
        } else if (dialect === "postgres") {
          indexesQuery = "SELECT tablename as TABLE_NAME, COUNT(*) as index_count FROM pg_indexes GROUP BY tablename";
        }
        
        const indexes = await sequelize.query(indexesQuery, { type: QueryTypes.SELECT });
        const tablesWithNoIndexes = indexes.filter(index => index.index_count === 0);
        
        if (tablesWithNoIndexes.length > 0) {
          auditResults.push({
            issue: `Found ${tablesWithNoIndexes.length} table(s) without indexes`,
            severity: "Medium",
            recommendation: "Review tables and add appropriate indexes for performance"
          });
        }
      } catch (error) {
        console.error("Error checking indexes:", error);
      }

      // Check for Database Version (Both MySQL & PostgreSQL)
      try {
        const version = await sequelize.query("SELECT VERSION() AS db_version", { type: QueryTypes.SELECT });
        const dbVersion = version[0].db_version;
        
        auditResults.push({
          issue: `Database version: ${dbVersion}`,
          severity: "Info",
          recommendation: "Ensure you're running a supported and up-to-date version"
        });
      } catch (error) {
        console.error("Error checking database version:", error);
      }
      
    } catch (queryError) {
      console.error("Error during audit queries:", queryError);
      auditResults.push({
        issue: "Error executing some audit checks",
        severity: "Error",
        recommendation: "Check server logs for details"
      });
    }

    res.json({ success: true, results: auditResults });
  } catch (err) {
    console.error("Error connecting to database:", err);
    res.status(500).json({ success: false, error: "Failed to connect to database. Please check your credentials." });
  }
}

module.exports = { scan };