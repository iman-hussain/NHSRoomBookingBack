// Install express server
const express = require('express');
const path = require('path');

// Initialize express app
const app = express();
const router = express.Router();

// Serve static pages
app.use(express.static('./'));

// Add API Routes 
app.use('/api', router);

// Specify public page entry point
app.get('/', function(req, res) {
    res.sendFile(path.join('/index.html'))
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


function mySqlTest() {
    const mysql = require('mysql')
    const connection =  mysql.createConnection({
        host: 'mi-linux.wlv.ac.uk',
        user: '1933527',
        password: '707y1s',
        database: 'db1933527',
        debug : true,
    });
    connection.connect();

    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) throw console.log(error);
        console.log('The solution is: ', results[0].solution);
    });

    connection.end();
}