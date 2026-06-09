const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Rubi#Data_01',
    database: 'IngeniaTech',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
});

pool.getConnection()
  .then(connection => {
    console.log("Conexión con MySQL establecida");
    connection.release();
  })
  .catch(error => {
    console.error(" Error al conectar con MySQL:", error.message);
  });

module.exports = pool;