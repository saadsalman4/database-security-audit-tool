// components/AuditResults.js
import React, { useState } from 'react';
import AuditSummary from './AuditSummary';
import VulnerabilityList from './VulnerabilityList';
import RiskList from './RiskList';
import RecommendationsList from './RecommendationList';

const AuditResults = ({ results }) => {
  const [activeTab, setActiveTab] = useState('summary');
  const totalIssues = 
    (results.vulnerabilities ? results.vulnerabilities.length : 0) + 
    (results.risks ? results.risks.length : 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">Audit Results</h2>
      
      <div className="flex border-b border-gray-200 mb-4">
        <button
          className={`py-2 px-4 mr-2 ${activeTab === 'summary' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('summary')}
        >
          Summary
        </button>
        <button
          className={`py-2 px-4 mr-2 ${activeTab === 'vulnerabilities' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('vulnerabilities')}
        >
          Vulnerabilities {results.vulnerabilities && `(${results.vulnerabilities.length})`}
        </button>
        <button
          className={`py-2 px-4 mr-2 ${activeTab === 'risks' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('risks')}
        >
          Risks {results.risks && `(${results.risks.length})`}
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'recommendations' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('recommendations')}
        >
          Recommendations
        </button>
      </div>

      <div className="p-2">
        {activeTab === 'summary' && <AuditSummary results={results} totalIssues={totalIssues} />}
        {activeTab === 'vulnerabilities' && <VulnerabilityList vulnerabilities={results.vulnerabilities || []} />}
        {activeTab === 'risks' && <RiskList risks={results.risks || []} />}
        {activeTab === 'recommendations' && <RecommendationsList recommendations={results.recommendations || []} />}
      </div>
    </div>
  );
};

export default AuditResults;