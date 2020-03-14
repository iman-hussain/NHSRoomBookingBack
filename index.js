// Install express server
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const oracledb = require('oracledb');

// Load environment variable
dotenv.config({ path: './config/config.env'});

// Initialize express app
const app = express();

// Body parser
app.use(express.json());

const cors = require('cors');
app.use(cors());

// Route files
const buildings = require('./routes/buildings');
const bookings = require('./routes/bookings');
const caterings = require('./routes/catering');
const reviews = require('./routes/reviews');
const rooms = require('./routes/rooms');
const toilets = require('./routes/toilets');
const users = require('./routes/users');

// Connect to the database.
app.use((req, res, next) => {
  oracledb.getConnection(
    {
      user          : process.env.ORACLE_USER,
      password      : process.env.ORACLE_PASSWORD,
      connectString : process.env.ORACLE_STRING
    },
    (error, conn) => {
      if (error) {console.log(err);}
      else{
        console.log("Connected");
        req._oracledb = conn;
        next();
      }
  });
});

// Enable routes to be called. 
app.use('/buildings', buildings);
app.use('/bookings', bookings);
app.use('/caterings', caterings);
app.use('/reviews', reviews);
app.use('/rooms', rooms);
app.use('/toilets', toilets);
app.use('/users', users); 

// Specify port
const port = process.env.PORT || 5000;

// Start the app
app.listen(port, () => {
  console.log('App started on port: ' + port);
});
