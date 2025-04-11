//Imports
const express = require("express");
const cors = require("cors");
const db = require("./db");
const otpRoutes = require("./otp");
require("dotenv").config();




//Creating an express instance
const app = express();
app.use(cors()); //front end can access back end
app.use(express.json());


app.use("/api", otpRoutes); // Enables /api/send-otp and /api/verify-otp

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


