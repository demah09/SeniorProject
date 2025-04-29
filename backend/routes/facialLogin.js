const express = require("express");
const router = express.Router();
const db = require("../db");

// Utility function to calculate Euclidean distance between two descriptors
function euclideanDistance(desc1, desc2) {
  let sum = 0;
  for (let i = 0; i < desc1.length; i++) {
    sum += Math.pow(desc1[i] - desc2[i], 2);
  }
  return Math.sqrt(sum);
}

router.post("/facial-login", async (req, res) => {
  const { descriptor } = req.body;

  if (!descriptor) {
    return res.status(400).json({ message: "Descriptor is required" });
  }

  try {
    const [patients] = await db.query("SELECT Email, FacialId, FirstName FROM Patient WHERE FacialId IS NOT NULL");

    for (const patient of patients) {
      const savedDescriptor = JSON.parse(patient.FacialId);
      const distance = euclideanDistance(descriptor, savedDescriptor);

      if (distance < 0.45) { 
        return res.status(200).json({ Email: patient.Email, FirstName: patient.FirstName });
      }
    }

    // ❌ No match found
    res.status(404).json({ message: "Face not recognized" });
  } catch (error) {
    console.error("Facial login error:", error);
    res.status(500).json({ message: "Server error during facial login" });
  }
});

module.exports = router;