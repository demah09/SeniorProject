const express = require("express");
const router = express.Router();
const db = require("../db");

// GET patient by email
router.get("/patient/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const [rows] = await db.query(
      `SELECT 
        FileNo, 
        ID_Iqama, 
        FirstName, 
        SecondName, 
        LastName, 
        DOB, 
        Email, 
        Phone_No AS PhoneNumber, 
        Emergency_Contact AS EmergencyContact, 
        Gender 
      FROM Patient 
      WHERE Email = ?`,
      [email]
    );

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "Patient not found" });
    }
  } catch (err) {
    console.error("Error fetching patient:", err);
    res.status(500).send("Server error");
  }
});

// PUT to update patient info
router.put("/patient/:email", async (req, res) => {
  const currentEmail = req.params.email;
  const { email: newEmail, phone, emergency_contact } = req.body;

  try {
    await db.query(
      `UPDATE Patient 
       SET Email = ?, 
           Phone_No = ?, 
           Emergency_Contact = ? 
       WHERE Email = ?`,
      [newEmail, phone, emergency_contact, currentEmail]
    );
    res.status(200).json({ message: "Patient updated successfully" });
  } catch (err) {
    console.error("Error updating patient:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
