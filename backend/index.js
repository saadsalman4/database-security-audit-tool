const express = require('express');
const cors = require('cors');
const axios = require('axios');
const os = require('os');
require('dotenv').config();

const app = express();
const PORT = 3001;

const auditRoutes = require('./routes/audit.routes')



app.use(cors());
app.use(express.json());

app.use('/api', auditRoutes)




app.get('/simulate-load', async (req, res) => {
  const count = parseInt(req.query.count || '100');
  const endpoint = `http://localhost:${PORT}/api/audit/sql`;

  const dummyPayload = {
    host: process.env.DUMMY_DB_HOST,
    username: process.env.DUMMY_DB_USER,
    password: process.env.DUMMY_DB_PASS,
    database: 'votingsystem_test',
    dialect: 'mysql'
  };

  const requests = [];

  for (let i = 0; i < count; i++) {
    requests.push(
      axios.post(endpoint, dummyPayload).catch((err) => {
        return { error: err.message }; // don't block on failed requests
      })
    );
  }

  await Promise.all(requests);

  res.send(`Simulated ${count} SQL audit requests from container: ${os.hostname()}`);
});


app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);
