'use strict'
// Install express server
const express = require('express');
const path = require('path');
const mysqlPool = require('./connection');

// Initialize express app
const app = express();
const router = require("https://mi-linux.wlv.ac.uk/~1933527/");

// Serve static pages
app.use('./', router);

// Add API Routes 
app.use('/api', router);
app.use('/mysql', router);

// Specify public page entry point
app.get('/mysql', function(req, res) {
    console.log("vsvdd")
    mysqlPool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) return console.log(error);
        console.log('The solution is: ', results[0].solution);
    });
});

// Serve backend routes (async)
app.get('/api', async function(req, res) {
  res.status(200).send('Hello World API')
  const result = mySqlTest();
});

// Specify port
const port = process.env.PORT || 5001;

// Start the app
app.listen(port, () => {
  console.log('App started on port: ' + port);
});
