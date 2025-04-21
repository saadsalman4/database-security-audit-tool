import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../ui/Card';
import SeverityBadge from '../ui/SeverityBadge';
import { Check, ChevronDown, ChevronUp, AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface Vulnerability {
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  recommendation?: string;
  details?: string[] | any;
}

interface AuditResultsProps {
  results: {
    vulnerabilities: Vulnerability[];
    risks: Vulnerability[];
    recommendations: string[];
    error?: string;
    details?: string;
  };
  theme: 'sql' | 'mongo';
}

const AuditResults: React.FC<AuditResultsProps> = ({ results, theme }) => {
  const [activeSection, setActiveSection] = useState<'vulnerabilities' | 'risks' | 'recommendations'>('vulnerabilities');

  const getStatusIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'high':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case 'medium':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'low':
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  if (results.error) {
    return (
      <Card className="p-6 bg-red-50 border-red-200" theme="neutral">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-red-800">Audit Error</h3>
            <div className="mt-2 text-red-700">
              <p>{results.error}</p>
              {results.details && <p className="mt-1 text-sm">{results.details}</p>}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  const totalVulnerabilities = results.vulnerabilities.length;
  const totalRisks = results.risks.length;
  const totalRecommendations = results.recommendations.length;

  const severityOrder = { 'critical': 0, 'high': 1, 'medium': 2, 'low': 3 };
  const sortedVulnerabilities = [...results.vulnerabilities].sort(
    (a, b) => severityOrder[a.severity] - severityOrder[b.severity]
  );
  const sortedRisks = [...results.risks].sort(
    (a, b) => severityOrder[a.severity] - severityOrder[b.severity]
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className={`cursor-pointer rounded-lg shadow-sm p-4 ${theme === 'sql' ? 'bg-sql-light border-sql-primary' : 'bg-mongo-light border-mongo-primary'} border`}
          onClick={() => setActiveSection('vulnerabilities')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Vulnerabilities</p>
              <p className={`text-3xl font-bold ${theme === 'sql' ? 'text-sql-dark' : 'text-mongo-dark'}`}>
                {totalVulnerabilities}
              </p>
            </div>
            <AlertCircle className={`h-10 w-10 ${theme === 'sql' ? 'text-sql-primary' : 'text-mongo-primary'}`} />
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className={`cursor-pointer rounded-lg shadow-sm p-4 ${theme === 'sql' ? 'bg-sql-light border-sql-primary' : 'bg-mongo-light border-mongo-primary'} border`}
          onClick={() => setActiveSection('risks')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Risks</p>
              <p className={`text-3xl font-bold ${theme === 'sql' ? 'text-sql-dark' : 'text-mongo-dark'}`}>
                {totalRisks}
              </p>
            </div>
            <AlertTriangle className={`h-10 w-10 ${theme === 'sql' ? 'text-sql-primary' : 'text-mongo-primary'}`} />
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className={`cursor-pointer rounded-lg shadow-sm p-4 ${theme === 'sql' ? 'bg-sql-light border-sql-primary' : 'bg-mongo-light border-mongo-primary'} border`}
          onClick={() => setActiveSection('recommendations')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Recommendations</p>
              <p className={`text-3xl font-bold ${theme === 'sql' ? 'text-sql-dark' : 'text-mongo-dark'}`}>
                {totalRecommendations}
              </p>
            </div>
            <Check className={`h-10 w-10 ${theme === 'sql' ? 'text-sql-primary' : 'text-mongo-primary'}`} />
          </div>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {activeSection === 'vulnerabilities' && (
          <motion.div
            key="vulnerabilities"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className={`text-xl font-semibold mb-4 ${theme === 'sql' ? 'text-sql-dark' : 'text-mongo-dark'}`}>
              Vulnerabilities
            </h3>
            
            {sortedVulnerabilities.length === 0 ? (
              <Card className="p-6" theme={theme}>
                <div className="flex items-center justify-center text-gray-500 py-8">
                  <Check className="h-6 w-6 mr-2 text-green-500" />
                  <span>No vulnerabilities detected!</span>
                </div>
              </Card>
            ) : (
              <div className="space-y-4">
                {sortedVulnerabilities.map((vulnerability, index) => (
                  <Card key={index} className="p-4" theme={theme}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        {getStatusIcon(vulnerability.severity)}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <h4 className="text-lg font-medium text-gray-900">
                              {vulnerability.type.charAt(0).toUpperCase() + vulnerability.type.slice(1)} Issue
                            </h4>
                            <SeverityBadge severity={vulnerability.severity} className="ml-2" />
                          </div>
                        </div>
                        <p className="mt-1 text-gray-600">{vulnerability.description}</p>
                        
                        {vulnerability.details && (
                          <div className="mt-2 bg-gray-50 rounded-md p-3 text-sm">
                            <h5 className="font-medium text-gray-700 mb-1">Details:</h5>
                            {Array.isArray(vulnerability.details) ? (
                              <ul className="list-disc pl-5 space-y-1">
                                {vulnerability.details.map((detail, idx) => (
                                  <li key={idx} className="text-gray-600">{detail}</li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-600">{JSON.stringify(vulnerability.details)}</p>
                            )}
                          </div>
                        )}
                        
                        {vulnerability.recommendation && (
                          <div className="mt-3">
                            <h5 className="text-sm font-medium text-gray-700">Recommendation:</h5>
                            <p className="text-sm text-gray-600 mt-1">{vulnerability.recommendation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </motion.div>
        )}
        
        {activeSection === 'risks' && (
          <motion.div
            key="risks"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className={`text-xl font-semibold mb-4 ${theme === 'sql' ? 'text-sql-dark' : 'text-mongo-dark'}`}>
              Risks
            </h3>
            
            {sortedRisks.length === 0 ? (
              <Card className="p-6" theme={theme}>
                <div className="flex items-center justify-center text-gray-500 py-8">
                  <Check className="h-6 w-6 mr-2 text-green-500" />
                  <span>No risks detected!</span>
                </div>
              </Card>
            ) : (
              <div className="space-y-4">
                {sortedRisks.map((risk, index) => (
                  <Card key={index} className="p-4" theme={theme}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        {getStatusIcon(risk.severity)}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <h4 className="text-lg font-medium text-gray-900">
                              {risk.type.charAt(0).toUpperCase() + risk.type.slice(1)} Risk
                            </h4>
                            <SeverityBadge severity={risk.severity} className="ml-2" />
                          </div>
                        </div>
                        <p className="mt-1 text-gray-600">{risk.description}</p>
                        
                        {risk.details && (
                          <div className="mt-2 bg-gray-50 rounded-md p-3 text-sm">
                            <h5 className="font-medium text-gray-700 mb-1">Details:</h5>
                            {Array.isArray(risk.details) ? (
                              <ul className="list-disc pl-5 space-y-1">
                                {risk.details.map((detail, idx) => (
                                  <li key={idx} className="text-gray-600">{detail}</li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-600">{JSON.stringify(risk.details)}</p>
                            )}
                          </div>
                        )}
                        
                        {risk.recommendation && (
                          <div className="mt-3">
                            <h5 className="text-sm font-medium text-gray-700">Recommendation:</h5>
                            <p className="text-sm text-gray-600 mt-1">{risk.recommendation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </motion.div>
        )}
        
        {activeSection === 'recommendations' && (
          <motion.div
            key="recommendations"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className={`text-xl font-semibold mb-4 ${theme === 'sql' ? 'text-sql-dark' : 'text-mongo-dark'}`}>
              Recommendations
            </h3>
            
            <Card className="p-6" theme={theme}>
              {results.recommendations.length === 0 ? (
                <div className="flex items-center justify-center text-gray-500 py-8">
                  <span>No recommendations available.</span>
                </div>
              ) : (
                <ul className="space-y-3">
                  {results.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${theme === 'sql' ? 'text-sql-primary' : 'text-mongo-primary'}`} />
                      <span className="ml-2 text-gray-700">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuditResults;