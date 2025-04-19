// components/RecommendationsList.js
import React from 'react';

const RecommendationsList = ({ recommendations }) => {
  return (
    <div>
      <h3 className="text-xl font-medium mb-4">Security Recommendations</h3>
      
      {recommendations.length === 0 ? (
        <div className="p-4 bg-gray-50 border border-gray-100 rounded-lg text-gray-700">
          No specific recommendations at this time.
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <ul className="space-y-3">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="flex">
                <div className="mr-3 text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div className="text-gray-700">{recommendation}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-700 mb-2">Next Steps</h4>
        <p className="text-gray-600 mb-4">
          After reviewing the audit results, consider implementing the recommended changes based on severity. 
          Start with critical and high-severity issues, then work your way down the list.
        </p>
        <p className="text-gray-600">
          Regular database audits are recommended as part of your security routine. 
          Consider scheduling automated audits on a monthly basis.
        </p>
      </div>
    </div>
  );
};

export default RecommendationsList;