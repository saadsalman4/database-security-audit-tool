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


module.exports={auditMongoDatabase}