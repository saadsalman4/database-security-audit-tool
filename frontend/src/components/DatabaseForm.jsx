// components/DatabaseForm.js
import React, { useState } from 'react';

const DatabaseForm = ({ onSubmit, dbType, setDbType }) => {
  const [formData, setFormData] = useState({
    host: '',
    username: '',
    password: '',
    database: '',
    dialect: 'mysql',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 mr-2 ${dbType === 'sql' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setDbType('sql')}
        >
          SQL Database
        </button>
        <button
          className={`py-2 px-4 ${dbType === 'mongodb' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
          onClick={() => setDbType('mongodb')}
        >
          MongoDB
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="host" className="block text-sm font-medium text-gray-700">
              Host
            </label>
            <input
              type="text"
              name="host"
              id="host"
              value={formData.host}
              onChange={handleChange}
              placeholder="localhost"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              required
            />
          </div>

          <div>
            <label htmlFor="database" className="block text-sm font-medium text-gray-700">
              Database Name
            </label>
            <input
              type="text"
              name="database"
              id="database"
              value={formData.database}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              required
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            />
          </div>

          {dbType === 'sql' && (
            <div>
              <label htmlFor="dialect" className="block text-sm font-medium text-gray-700">
                SQL Dialect
              </label>
              <select
                name="dialect"
                id="dialect"
                value={formData.dialect}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                required
              >
                <option value="mysql">MySQL</option>
                <option value="postgres">PostgreSQL</option>
                <option value="mariadb">MariaDB</option>
                <option value="mssql">MS SQL Server</option>
              </select>
            </div>
          )}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md font-medium hover:bg-blue-700"
          >
            Run Database Audit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DatabaseForm;