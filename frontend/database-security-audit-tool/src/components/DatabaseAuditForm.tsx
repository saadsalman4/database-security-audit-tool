import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./DatabaseAuditForm.css"; // Import CSS file

interface AuditResult {
  issue: string;
  severity: string;
  recommendation: string;
}

const DatabaseAuditForm: React.FC = () => {
  const [dbConfig, setDbConfig] = useState({
    host: "",
    username: "",
    password: "",
    database: "",
    type: "mysql", // or "postgres"
  });

  const [auditResults, setAuditResults] = useState<AuditResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDbConfig({ ...dbConfig, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuditResults([]);

    try {
      const response = await axios.post("http://localhost:5000/api/audit", dbConfig);
      setAuditResults(response.data);
      toast.success("Audit completed successfully!");
    } catch (error) {
      toast.error("Failed to connect to the database. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Database Security Audit</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="host" value={dbConfig.host} onChange={handleChange} placeholder="Database Host" required />
        <input type="text" name="username" value={dbConfig.username} onChange={handleChange} placeholder="Username" required />
        <input type="password" name="password" value={dbConfig.password} onChange={handleChange} placeholder="Password" required />
        <input type="text" name="database" value={dbConfig.database} onChange={handleChange} placeholder="Database Name" required />
        
        <select name="type" value={dbConfig.type} onChange={handleChange}>
          <option value="mysql">MySQL</option>
          <option value="postgres">PostgreSQL</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Auditing..." : "Run Audit"}
        </button>
      </form>

      {auditResults.length > 0 && (
        <div className="table-container">
          <h3>Audit Results</h3>
          <table>
            <thead>
              <tr>
                <th>Issue</th>
                <th>Severity</th>
                <th>Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {auditResults.map((result, index) => (
                <tr key={index}>
                  <td>{result.issue}</td>
                  <td>{result.severity}</td>
                  <td>{result.recommendation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default DatabaseAuditForm;
