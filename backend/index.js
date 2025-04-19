const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

const auditRoutes = require('./routes/audit.routes')



app.use(cors());
app.use(express.json());

app.use('/api', auditRoutes)

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);
