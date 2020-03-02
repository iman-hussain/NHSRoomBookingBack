const mysql = require('mysql')

var mysqlPool =  mysql.createPool({
    host: 'mi-linux.wlv.ac.uk',
    user: '1933527',
    password: '707y1s',
    database: 'db1933527',
    debug : true,
    connectionLimit: 10
});

mysqlPool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
    return
})

module.exports = mysqlPool;

