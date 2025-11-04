const mysql = require("mysql2/promise");

// Create the connection pool. The pool-specific settings are the defaults
const mySqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "shiftswapdb",
});

module.exports = mySqlPool;
