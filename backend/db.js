// Load environment variables from .env file for the DB pass
require('dotenv').config();

const fs = require("fs"); //for reading the SSL certificate
const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "checkmate-spdb.l.aivencloud.com",
  user: "avnadmin",
  password: process.env.DB_PASSWORD, 
  database: "SPDBavien",
  port: 24673,
  ssl: {
    ca: fs.readFileSync('./backend/certs/ca.pem')
  }
});

module.exports = db;
