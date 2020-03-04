// Install express server
const express = require('express');
const path = require('path');
const oracledb = require('oracledb');

// Initialize express app
const app = express();
const router = express.Router();

const cors = require('cors');
app.use(cors());

app.use((req, res, next) => {
  oracledb.getConnection(
  {
    user          : "OPS$1415065",
    password      : "P3nn1602",
    connectString : "ora-srv.wlv.ac.uk:1521/catdb.wlv.ac.uk"
  },
  (error, conn) => {
    if (error) {console.log(err);}
    else{
      req._oracledb = conn;
      next();
    }
})});

// Specify public page entry point
app.get('/rooms', async function(req, res) {
  req._oracledb.execute("SELECT * FROM SHIP_TB", function(err, rows){
    req._oracledb.close();
    if (!err)
    {
      res.send(rows)
    }
    else
    {
      console.log('Error while performing Query.');
    }
  })
});

// Specify public page entry point
app.get('/rooms2', async function(req, res) {
  const sqlQuery = "INSERT INTO SHIP_TB VALUES (:1, :2, :3, :4)";
  binds = [["New Ship", 455, 36000, 2500]];
  req._oracledb.executeMany(sqlQuery, binds, {autoCommit: true}, function(err, rows){
    req._oracledb.close();
    if (!err)
    {
      res.send(rows);
    }
    else
    {
      console.log(err);
      console.log('Error while performing Query.');
    }
  })
});

// Serve backend routes (async)
app.get('/api', async function(req, res) {
  res.status(200).send('Hello World API')
  const result = mySqlTest();
});

// Specify port
const port = process.env.PORT || 3001;

// Start the app
app.listen(port, () => {
  console.log('App started on port: ' + port);
});
