const express = require('express');
const cors = require('cors');
const axios = require('axios');
const os = require('os');

const app = express();
const PORT = 3001;

const auditRoutes = require('./routes/audit.routes')



app.use(cors());
app.use(express.json());

app.use('/api', auditRoutes)




app.post('/simulate-load', async (req, res) => {
  const count = parseInt(req.query.count || '100');
  const endpoint = `http://127.0.0.1:${PORT}/api/audit/sql`;

  const payload = req.body;

  if (!payload || !payload.host || !payload.username || !payload.database || !payload.dialect) {
    return res.status(400).json({ error: 'Missing required database parameters in payload' });
  }

  const requests = [];

  for (let i = 0; i < count; i++) {
    requests.push(
      axios.post(endpoint, payload).catch((err) => {
        return { error: err.message };
      })
    );
  }

  await Promise.all(requests);

  res.send(`Simulated ${count} SQL audit requests from container: ${os.hostname()}`);
});



app.listen(PORT, '0.0.0.0',(error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);
