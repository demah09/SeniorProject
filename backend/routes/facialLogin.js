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

  console.log("Descriptor received:", descriptor);

  if (!descriptor || !Array.isArray(descriptor)) {
    return res.status(400).json({ message: "Descriptor is required and must be an array" });
  }

  try {
    const [patients] = await db.query(
      "SELECT Email, FacialId, FirstName FROM Patient WHERE FacialId IS NOT NULL"
    );

    for (const patient of patients) {
      console.log(`Checking patient: ${patient.Email} | Raw FacialId: ${patient.FacialId}`);

      let savedDescriptor;
      try {
        savedDescriptor = JSON.parse(patient.FacialId);
        if (!Array.isArray(savedDescriptor)) {
          console.warn(`Skipping: parsed FacialId is not an array for ${patient.Email}`);
          continue;
        }
      } catch (err) {
        console.warn(`Invalid JSON for ${patient.Email}, skipping...`);
        continue;
      }

      const distance = euclideanDistance(descriptor, savedDescriptor);
      console.log(`Distance to ${patient.Email}: ${distance}`);

      if (distance < 0.45) {
        console.log(`Match found for ${patient.Email}`);
        return res.status(200).json({
          Email: patient.Email,
          FirstName: patient.FirstName,
        });
      }
    }

    console.log("No face match found");
    res.status(404).json({ message: "Face not recognized" });

  } catch (error) {
    console.error("Facial login error:", error);
    res.status(500).json({ message: "Server error during facial login" });
  }
});

module.exports = router;
