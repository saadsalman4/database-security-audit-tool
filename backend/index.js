const express = require('express');
const cors = require('cors');
const serverless = require("serverless-http");

const app = express();

const auditRoutes = require('./routes/audit.routes')

app.use(cors());
app.use(express.json());

app.use('/api', auditRoutes)

app.get("/", (req, res) => {
    res.send("Hello from Lambda!");
});

// Wrap with serverless and log the raw Lambda event
const handler = serverless(app, {
  request: (request, event, context) => {
    console.log("Lambda event:", JSON.stringify(event));
  }
});

module.exports.handler = handler;
