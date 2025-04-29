const express = require("express");
const router = express.Router();
const db = require("../db");

// GET doctors by clinic ID
router.get("/doctors/:clinicId", async (req, res) => {
  const clinicId = req.params.clinicId;

  try {
    const [rows] = await db.query(
      "SELECT * FROM Doctor WHERE Clinic_ID = ?",
      [clinicId]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Server error fetching doctors" });
  }
});

module.exports = router;
