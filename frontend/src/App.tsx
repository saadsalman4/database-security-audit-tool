import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import SqlAudit from './pages/SqlAudit';
import MongoAudit from './pages/MongoAudit';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/audit/sql" element={<SqlAudit />} />
          <Route path="/audit/mongodb" element={<MongoAudit />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;