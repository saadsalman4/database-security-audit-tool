import React, { useState } from 'react';
import FormField from './FormField';
import Button from '../ui/Button';
import { Database, ServerCrash } from 'lucide-react';
import { performMongoAudit } from '../../services/api';

interface MongoAuditFormProps {
  onAuditComplete: (results: any) => void;
  onAuditError: (error: string) => void;
}

const MongoAuditForm: React.FC<MongoAuditFormProps> = ({ onAuditComplete, onAuditError }) => {
  const [formData, setFormData] = useState({
    host: '',
    username: '',
    password: '',
    database: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.host.trim()) {
      newErrors.host = 'Host is required';
    }
    
    if (!formData.database.trim()) {
      newErrors.database = 'Database name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const results = await performMongoAudit(formData);
      onAuditComplete(results);
    } catch (error) {
      if (error instanceof Error) {
        onAuditError(error.message);
      } else {
        onAuditError('An unknown error occurred during the audit');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          label="Host"
          name="host"
          placeholder="localhost or IP address"
          value={formData.host}
          onChange={handleChange}
          required
          error={errors.host}
          theme="mongo"
        />
        
        <FormField
          label="Username (optional)"
          name="username"
          placeholder="Database username"
          value={formData.username}
          onChange={handleChange}
          theme="mongo"
        />
        
        <FormField
          label="Password (optional)"
          name="password"
          type="password"
          placeholder="Database password"
          value={formData.password}
          onChange={handleChange}
          theme="mongo"
        />
        
        <FormField
          label="Database Name"
          name="database"
          placeholder="Database name"
          value={formData.database}
          onChange={handleChange}
          required
          error={errors.database}
          theme="mongo"
        />
      </div>
      
      <div className="flex justify-end">
        <Button
          type="submit"
          theme="mongo"
          isLoading={isLoading}
          icon={isLoading ? undefined : <Database size={18} />}
          disabled={isLoading}
          className="ml-3"
        >
          {isLoading ? 'Running Audit...' : 'Start MongoDB Audit'}
        </Button>
      </div>
    </form>
  );
};

export default MongoAuditForm;