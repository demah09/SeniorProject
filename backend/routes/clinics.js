const express = require("express");
const router = express.Router();
const db = require("../db"); 

// GET all clinics
router.get("/clinics", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Clinic");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching clinics:", error);
    res.status(500).json({ message: "Server error fetching clinics" });
  }
});

module.exports = router;
