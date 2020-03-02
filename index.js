'use strict'
// Install express server
const express = require('express');
const path = require('path');
const mysqlconnection = require('./connection');

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
    console.log(mysqlconnection.state);
    mysqlconnection.query('SELECT * FROM Building', function (error, results, fields) {
        if (error) throw console.log(error);
        console.log('The solution is: ', results);
        mysqlconnection.end();
        res.send(results);
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
