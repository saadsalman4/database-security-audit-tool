// App.js
import React, { useState } from 'react';
import './App.css';
import DatabaseForm from './components/DatabaseForm';
import AuditResults from './components/AuditResults';

function App() {
  const [auditResults, setAuditResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dbType, setDbType] = useState('sql');

  const handleAudit = async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      const endpoint = `http://localhost:3000/api/audit/${dbType}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Unknown error occurred');
      }
      
      setAuditResults(data.results);
    } catch (err) {
      setError(err.message);
      setAuditResults(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-600">Database Audit Tool</h1>
        <p className="text-gray-600 mt-2">Scan your database for vulnerabilities and security risks</p>
      </header>
      
      <DatabaseForm 
        onSubmit={handleAudit} 
        dbType={dbType} 
        setDbType={setDbType} 
      />
      
      {loading && (
        <div className="text-center my-8">
          <div className="spinner"></div>
          <p className="mt-4 text-gray-600">Running database audit tests...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}
      
      {auditResults && <AuditResults results={auditResults} />}
    </div>
  );
}

export default App;