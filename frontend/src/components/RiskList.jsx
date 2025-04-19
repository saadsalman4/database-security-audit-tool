// components/RiskList.js
import React from 'react';

const RiskList = ({ risks }) => {
  // Helper function to get severity badge styling
  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Group risks by type for better organization
  const groupedRisks = risks.reduce((acc, risk) => {
    if (!acc[risk.type]) {
      acc[risk.type] = [];
    }
    acc[risk.type].push(risk);
    return acc;
  }, {});

  return (
    <div>
      <h3 className="text-xl font-medium mb-4">Detected Risks</h3>
      
      {risks.length === 0 ? (
        <div className="p-4 bg-green-50 border border-green-100 rounded-lg text-green-700">
          No risks detected. Great job!
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedRisks).map(([type, typeRisks]) => (
            <div key={type} className="mb-4">
              <h4 className="text-lg font-medium text-gray-800 mb-2 capitalize">
                {type.replace('_', ' ')} Risks
              </h4>
              
              <div className="space-y-3">
                {typeRisks.map((risk, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-3 flex items-center justify-between border-b">
                      <div className="font-medium truncate">
                        {risk.description.length > 60 
                          ? `${risk.description.substring(0, 60)}...` 
                          : risk.description}
                      </div>
                      <div className={`px-2 py-1 text-xs font-medium rounded border ${getSeverityBadge(risk.severity)}`}>
                        {risk.severity.toUpperCase()}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <p className="text-gray-800 mb-3">{risk.description}</p>
                      
                      {risk.details && (
                        <div className="mb-3">
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Details:</h4>
                          {Array.isArray(risk.details) ? (
                            <ul className="list-disc pl-5 text-sm text-gray-600">
                              {risk.details.map((detail, idx) => (
                                <li key={idx}>{detail}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-gray-600">{risk.details}</p>
                          )}
                        </div>
                      )}
                      
                      {risk.recommendation && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Recommendation:</h4>
                          <p className="text-sm text-gray-600">{risk.recommendation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RiskList;