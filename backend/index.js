const express = require('express');
const cors = require('cors');
const serverless = require("serverless-http");


const app = express();
const PORT = 3000;

const auditRoutes = require('./routes/audit.routes')



app.use(cors());
app.use(express.json());

app.use('/api', auditRoutes)

app.get("/", (req, res) => {
    res.send("Hello from Lambda!");
  });
  
  // Export the handler
  module.exports.handler = serverless(app);
