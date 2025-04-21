import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../components/ui/Container';
import Card from '../components/ui/Card';
import MongoAuditForm from '../components/forms/MongoAuditForm';
import AuditResults from '../components/audit/AuditResults';
import { Server, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

interface AuditResultsData {
  success: boolean;
  results: {
    vulnerabilities: any[];
    risks: any[];
    recommendations: string[];
  };
  error?: string;
  details?: string;
}

const MongoAudit: React.FC = () => {
  const [auditResults, setAuditResults] = useState<AuditResultsData | null>(null);
  const [auditError, setAuditError] = useState<string | null>(null);

  const handleAuditComplete = (data: AuditResultsData) => {
    setAuditResults(data);
    setAuditError(null);
  };

  const handleAuditError = (error: string) => {
    setAuditError(error);
    setAuditResults(null);
  };

  const resetAudit = () => {
    setAuditResults(null);
    setAuditError(null);
  };

  return (
    <div className="py-12">
      <Container>
        <div className="mb-8">
          <div className="inline-flex items-center justify-center p-2 bg-mongo-light rounded-lg mb-4">
            <Server className="h-6 w-6 text-mongo-primary" />
            <span className="ml-2 text-mongo-primary font-medium">MongoDB Security Audit</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">MongoDB Security Audit</h1>
          <p className="mt-2 text-lg text-gray-600">
            Scan your MongoDB database for security vulnerabilities, configuration issues, and performance risks.
          </p>
        </div>

        {auditResults ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <Button 
                variant="outline" 
                theme="mongo" 
                onClick={resetAudit}
                icon={<ArrowLeft size={16} />}
              >
                New Audit
              </Button>
            </div>
            
            <Card className="p-6" theme="mongo">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Audit Results</h2>
              <AuditResults results={auditResults.results} theme="mongo" />
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6" theme="mongo">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Connect to MongoDB Database</h2>
              
              {auditError && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4 text-red-700">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Audit Error</h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>{auditError}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <MongoAuditForm onAuditComplete={handleAuditComplete} onAuditError={handleAuditError} />
            </Card>
            
            <div className="mt-8 bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 flex-1 md:flex md:justify-between">
                  <p className="text-sm text-green-700">
                    All database credentials are processed securely and not stored or transmitted outside your system.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </Container>
    </div>
  );
};

export default MongoAudit;