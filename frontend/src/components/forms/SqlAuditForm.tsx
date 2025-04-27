import React, { useState } from 'react';
import FormField from './FormField';
import Button from '../ui/Button';
import { Database, ServerCrash } from 'lucide-react';
import { performSqlAudit } from '../../services/api';

interface SqlAuditFormProps {
  onAuditComplete: (results: any) => void;
  onAuditError: (error: string) => void;
}

const SqlAuditForm: React.FC<SqlAuditFormProps> = ({ onAuditComplete, onAuditError }) => {
  const [formData, setFormData] = useState({
    host: '',
    username: '',
    password: '',
    database: '',
    dialect: 'mysql',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.database.trim()) {
      newErrors.database = 'Database name is required';
    }
    
    if (!formData.dialect) {
      newErrors.dialect = 'Database type is required';
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
      const results = await performSqlAudit(formData);
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
          theme="sql"
        />
        
        <FormField
          label="Username"
          name="username"
          placeholder="Database username"
          value={formData.username}
          onChange={handleChange}
          required
          error={errors.username}
          theme="sql"
        />
        
        <FormField
          label="Password"
          name="password"
          type="password"
          placeholder="Database password"
          value={formData.password}
          onChange={handleChange}
          theme="sql"
        />
        
        <FormField
          label="Database Name"
          name="database"
          placeholder="Database name"
          value={formData.database}
          onChange={handleChange}
          required
          error={errors.database}
          theme="sql"
        />
        
        <div className="mb-4 md:col-span-2">
          <label htmlFor="dialect" className="block text-sm font-medium text-sql-dark mb-1">
            Database Type <span className="text-red-500">*</span>
          </label>
          <select
            id="dialect"
            name="dialect"
            value={formData.dialect}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-sql-primary focus:border-sql-primary py-2 px-3"
            required
          >
            <option value="mysql">MySQL</option>
            {/* <option value="postgres">PostgreSQL</option>
            <option value="mariadb">MariaDB</option>
            <option value="mssql">Microsoft SQL Server</option> */}
          </select>
          {errors.dialect && (
            <p className="mt-1 text-sm text-red-600">{errors.dialect}</p>
          )}
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button
          type="submit"
          theme="sql"
          isLoading={isLoading}
          icon={isLoading ? undefined : <Database size={18} />}
          disabled={isLoading}
          className="ml-3"
        >
          {isLoading ? 'Running Audit...' : 'Start SQL Audit'}
        </Button>
      </div>
    </form>
  );
};

export default SqlAuditForm;