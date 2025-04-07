//Imports
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

//Creating an express instance
const app = express();
app.use(cors()); //front end can access back end
app.use(express.json());

// Connect to MySQL Database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "DeemahRoot09!", 
  database: "SPDB",
  port: 3306, 
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database ✅");
});

// API Route to Fetch Users from Database
app.get("/patients", (req, res) => {
  db.query("SELECT * FROM Patient", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// Start the Backend Server
app.listen(5001, () => {
  console.log("Backend running on http://localhost:5001");
});
