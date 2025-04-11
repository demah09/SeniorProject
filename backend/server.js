//Imports
const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();






//Routes
const otpRoutes = require("./routes/otp");
const registerRoutes = require("./routes/register");
const patientRoutes = require("./routes/patients");




//Creating an express instance
const app = express();
app.use(cors()); //front end can access back end
app.use(express.json());

app.use("/api", registerRoutes);
app.use("/api", otpRoutes); // Enables /api/send-otp and /api/verify-otp
app.use("/api", patientRoutes);

// Start the Backend Server
app.listen(5001, () => {
  console.log("Backend running on http://localhost:5001");
});


