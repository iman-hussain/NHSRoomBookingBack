// Install express server
const express = require('express');
const path = require('path');
const oracledb = require('./connection');

// Initialize express app
const app = express();
const router = express.Router();

// Serve static pages
app.use('./', router);

// Add API Routes 
app.use('/api', router);
app.use('/mysql', router);

// Specify public page entry point
app.get('/mysql', function(req, res) {
    
});

// Serve backend routes (async)
app.get('/api', async function(req, res) {
  res.status(200).send('Hello World API')
  const result = mySqlTest();
});

// Specify port
const port = process.env.PORT || 3000;

// Start the app
app.listen(port, () => {
  console.log('App started on port: ' + port);
});
