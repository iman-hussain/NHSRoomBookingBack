var oracledb = require('oracledb');
let connection;

async function run(){
    try{
        connection = await oracledb.getConnection( {
            user          : "OPS$1415065",
            password      : "P3nn1602",
            connectString : "ora-srv.wlv.ac.uk:1521/catdb.wlv.ac.uk"
        });
    
      const result = await connection.execute(
          "SELECT * FROM SHIP_TB"
      ); 
      console.log(result.rows);
    } catch (err) {
        console.error(err);
      } finally {
        if (connection) {
          try {
            await connection.close();
          } catch (err) {
            console.error(err);
          }
        }
      }
}
  
run();

module.exports = oracledb;

