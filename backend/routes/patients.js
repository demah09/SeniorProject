const express = require("express");
const router = express.Router();
const db = require("../db");


// GET /api/patient/:email — Get a single patient by email
router.get("/patient/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const [rows] = await db.query("SELECT * FROM Patient WHERE Email = ?", [email]);

    if (rows.length > 0) {
      res.json(rows[0]); // Send back the matching patient
    } else {
      res.status(404).json({ message: "Patient not found" });
    }
  } catch (err) {
    console.error("Error fetching patient by email:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
