// components/AuditSummary.js
import React from 'react';

const AuditSummary = ({ results, totalIssues }) => {
  // Count severity levels
  const severityCounts = {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
  };

  // Count vulnerabilities by severity
  if (results.vulnerabilities) {
    results.vulnerabilities.forEach(vuln => {
      if (severityCounts[vuln.severity] !== undefined) {
        severityCounts[vuln.severity]++;
      }
    });
  }

  // Count risks by severity
  if (results.risks) {
    results.risks.forEach(risk => {
      if (severityCounts[risk.severity] !== undefined) {
        severityCounts[risk.severity]++;
      }
    });
  }

  // Count unique test types that were run
  const testTypes = new Set();
  if (results.vulnerabilities) {
    results.vulnerabilities.forEach(vuln => testTypes.add(vuln.type));
  }
  if (results.risks) {
    results.risks.forEach(risk => testTypes.add(risk.type));
  }

  // Calculate security score (simple example - can be made more sophisticated)
  const calculateScore = () => {
    if (totalIssues === 0) return 100;
    
    // Weighted scoring based on severity
    const weightedIssues = 
      severityCounts.critical * 10 + 
      severityCounts.high * 5 + 
      severityCounts.medium * 2 + 
      severityCounts.low * 1;
    
    // Basic score calculation
    const maxScore = 100;
    const score = Math.max(0, maxScore - weightedIssues * 5);
    return Math.min(100, score);
  };

  const securityScore = calculateScore();
  
  // Determine score color and label
  const getScoreInfo = (score) => {
    if (score >= 90) return { color: 'text-green-600', label: 'Excellent' };
    if (score >= 70) return { color: 'text-blue-600', label: 'Good' };
    if (score >= 50) return { color: 'text-yellow-600', label: 'Fair' };
    return { color: 'text-red-600', label: 'Poor' };
  };
  
  const scoreInfo = getScoreInfo(securityScore);
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Security Score */}
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Security Score</h3>
          <div className={`text-4xl font-bold ${scoreInfo.color}`}>
            {securityScore}%
          </div>
          <div className={`text-sm ${scoreInfo.color}`}>{scoreInfo.label}</div>
        </div>
        
        {/* Total Issues */}
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Total Issues</h3>
          <div className="text-4xl font-bold text-gray-800">{totalIssues}</div>
          <div className="text-sm text-gray-500">
            Found across {testTypes.size} test categories
          </div>
        </div>
        
        {/* Tests Run */}
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Tests Run</h3>
          <div className="text-4xl font-bold text-gray-800">{testTypes.size}</div>
          <div className="text-sm text-gray-500">
            {Array.from(testTypes).slice(0, 3).join(', ')}
            {testTypes.size > 3 ? '...' : ''}
          </div>
        </div>
      </div>
      
      {/* Severity Breakdown */}
      <h3 className="text-lg font-medium text-gray-700 mb-3">Issues by Severity</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="flex items-center p-3 bg-red-50 rounded-lg">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <div className="flex-1">Critical</div>
          <div className="font-bold">{severityCounts.critical}</div>
        </div>
        <div className="flex items-center p-3 bg-orange-50 rounded-lg">
          <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
          <div className="flex-1">High</div>
          <div className="font-bold">{severityCounts.high}</div>
        </div>
        <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
          <div className="flex-1">Medium</div>
          <div className="font-bold">{severityCounts.medium}</div>
        </div>
        <div className="flex items-center p-3 bg-blue-50 rounded-lg">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <div className="flex-1">Low</div>
          <div className="font-bold">{severityCounts.low}</div>
        </div>
      </div>
      
      {/* Test Categories */}
      <h3 className="text-lg font-medium text-gray-700 mb-3">Test Categories Run</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
        {Array.from(testTypes).map(type => (
          <div key={type} className="bg-gray-50 p-2 rounded flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <div className="capitalize">{type.replace('_', ' ')}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditSummary;