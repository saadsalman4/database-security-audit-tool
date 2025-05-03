import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

interface SqlAuditParams {
  host: string;
  username: string;
  password: string;
  database: string;
  dialect: string;
}

interface MongoAuditParams {
  host: string;
  username: string;
  password: string;
  database: string;
}

export const performSqlAudit = async (params: SqlAuditParams) => {
  try {
    const response = await api.post('api/audit/sql', params);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data.error || 'Failed to perform SQL audit');
      } else if (error.request) {
        throw new Error('No response from server. Please check if the backend is running.');
      } else {
        throw new Error('Error setting up request: ' + error.message);
      }
    }
    throw error;
  }
};

export const performMongoAudit = async (params: MongoAuditParams) => {
  try {
    const response = await api.post('api/audit/mongodb', params);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data.error || 'Failed to perform MongoDB audit');
      } else if (error.request) {
        throw new Error('No response from server. Please check if the backend is running.');
      } else {
        throw new Error('Error setting up request: ' + error.message);
      }
    }
    throw error;
  }
};