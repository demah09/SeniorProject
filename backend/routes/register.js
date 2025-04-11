const express = require("express");
const router = express.Router();
const db = require("../db"); // relative path to db.js

// Register a new patient
router.post("/register", async (req, res) => {
  const {
    ID_Iqama,
    FirstName,
    SecondName,
    LastName,
    DOB,
    Phone_No,
    Email,
    Emergency_Contact,
    Gender,
  } = req.body;

  try {
    await db.query(
      `INSERT INTO Patient 
        (ID_Iqama, FirstName, SecondName, LastName, DOB, Phone_No, Email, Emergency_Contact, Gender, Status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        ID_Iqama,
        FirstName,
        SecondName,
        LastName,
        DOB,
        Phone_No,
        Email,
        Emergency_Contact,
        Gender,
        "Active", // default value
      ]
    );

    res.status(201).json({ message: "Patient registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Failed to register patient" });
  }
});

module.exports = router;
