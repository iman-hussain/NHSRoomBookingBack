const mysql = require('mysql')

var mysqlconnection =  mysql.createConnection({
    host: 'mi-linux.wlv.ac.uk',
    user: '1933527',
    password: '707y1s',
    database: 'db1933527',
    debug : true,
});

mysqlconnection.connect(err => {
    console.log("hbachk")
    if(!err) console.log("Connected")
    else console.log("Connection Failed")
});

mysqlconnection.end();

module.exports = mysqlconnection;

