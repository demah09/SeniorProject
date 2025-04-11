// Database connection

const mysql = require("mysql2/promise"); // Use the promise version

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "DeemahRoot09!",
  database: "SPDB",
  port: 3306,
});

module.exports = db;
