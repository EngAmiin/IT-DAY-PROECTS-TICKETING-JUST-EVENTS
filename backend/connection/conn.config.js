const mysql = require('mysql2');


const conn = mysql.createConnection({
  host: process.env.MYSQL_ADDON_HOST,
  database: process.env.MYSQL_ADDON_DB,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASS,
  port: process.env.MYSQL_ADDON_PORT,
  maxIdle: 0,
  idleTimeout: 60000,
  enableKeepAlive: true,
});

conn.connect((err)=>{
    if(err)
    throw err;
})

module.exports=conn;