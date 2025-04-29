// Database connection

const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "checkmate-spdb.l.aivencloud.com",  user: "avnadmin",
  password: "AVNS_o1GhUbRe6GHgkyTGG9O",
  database: "defaultdb",
  port: 25060, // Default Aiven MySQL port
  ssl: {
    ca: fs.readFileSync("./certs/ca.pem")  }
});

module.exports = db;