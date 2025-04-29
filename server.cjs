//Imports
const express = require("express");
const cors = require("cors");
const db = require("./backend/db");
require("dotenv").config();






//Routes
const otpRoutes = require("./backend/routes/otp");
const registerRoutes = require("./backend/routes/register");
const patientRoutes = require("./backend/routes/patients");
const clinicRoutes = require("./backend/routes/clinics");
const doctorRoutes = require("./backend/routes/doctors");
const appointmentRoutes = require("./backend/routes/appointment");
const facialLoginRoute = require("./backend/routes/facialLogin");





//Creating an express instance
const app = express();


//front end can access back end
app.use(cors({
  origin: "https://checkmate-pmu.netlify.app", //frontend domain
  credentials: true
}));

app.use(express.json());

app.use("/api", registerRoutes);
app.use("/api", otpRoutes); // Enables /api/send-otp and /api/verify-otp
app.use("/api", patientRoutes);
app.use("/api", clinicRoutes);
app.use("/api", doctorRoutes);
app.use("/api", appointmentRoutes);
app.use("/api", facialLoginRoute);

app.get("/", (req, res) => {
  res.send("Checkmate backend is running");
});



// Start the Backend Server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});



