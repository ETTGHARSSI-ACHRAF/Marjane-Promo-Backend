require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./router/router');
const cors = require('cors');

app.use(cors({
    origin : '*',
    methods : ['GET','POST','DELETE','PATCH']
}));

app.use(express.json());
app.use('/api',router);

const port = process.env.portServer || 3000;
app.listen(port,()=>{console.log(`http://localhost:${port}`);});