const express = require("express");
const router = express.Router();
const db = require("../db"); // Adjust the path as needed

// POST /api/appointments — Add new appointment with availability check
router.post("/appointments", async (req, res) => {
  const { FileNo, Doc_ID, Clinic_ID, datetime } = req.body;

  if (!FileNo || !Doc_ID || !Clinic_ID || !datetime) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const [existing] = await db.query(
      "SELECT * FROM Appointment WHERE Doc_ID = ? AND DOA = ? AND Status = 'booked'",
      [Doc_ID, datetime]
    );

    if (existing.length > 0) {
      return res.status(409).json({ message: "Time slot already booked" });
    }

    const [result] = await db.query(
      "INSERT INTO Appointment (Patient_ID, Doc_ID, Clinic_ID, DOA, Status) VALUES (?, ?, ?, ?, 'booked')",
      [FileNo, Doc_ID, Clinic_ID, datetime]
    );

    res.status(201).json({ message: "Appointment booked", apptId: result.insertId });
  } catch (err) {
    console.error("Error booking appointment:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/appointments/:fileNo — Fetch all appointments for a patient
router.get("/appointments/:fileNo", async (req, res) => {
  const fileNo = req.params.fileNo;

  try {
    const [rows] = await db.query(`
      SELECT 
        A.Appt_ID,
        A.DOA,
        A.Status,
        D.Name,
        D.Specialization,
        D.Office,
        C.Clinic_Name AS ClinicName,
        C.Floor
      FROM Appointment A
      JOIN Doctor D ON A.Doc_ID = D.Doctor_ID
      JOIN Clinic C ON A.Clinic_ID = C.Clinic_ID
      WHERE A.Patient_ID = ?
      ORDER BY A.DOA DESC
    `, [fileNo]);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Failed to fetch appointments." });
  }
});

// GET /api/appointment/:id — Fetch single appointment by ID
router.get("/appointment/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const [rows] = await db.query(`
      SELECT 
        A.Appt_ID,
        A.DOA,
        A.Status,
        D.Name AS DoctorName,
        D.Specialization,
        C.Clinic_Name AS ClinicName
      FROM Appointment A
      JOIN Doctor D ON A.Doc_ID = D.Doctor_ID
      JOIN Clinic C ON A.Clinic_ID = C.Clinic_ID
      WHERE A.Appt_ID = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching appointment:", error);
    res.status(500).json({ message: "Failed to retrieve appointment" });
  }
});

// PUT /api/appointment/:id — Update date/time or status
router.put("/appointment/:id", async (req, res) => {
  const id = req.params.id;
  const { datetime, status } = req.body;

  try {
    if (datetime && !status) {
      await db.query(
        "UPDATE Appointment SET DOA = ? WHERE Appt_ID = ?",
        [datetime, id]
      );
      return res.status(200).json({ message: "Appointment date/time updated" });
    }

    if (status) {
      await db.query(
        "UPDATE Appointment SET Status = ? WHERE Appt_ID = ?",
        [status, id]
      );
      return res.status(200).json({ message: `Appointment status updated to ${status}` });
    }

    return res.status(400).json({ message: "Invalid request body" });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ message: "Failed to update appointment" });
  }
});

// DELETE /api/appointment/:id — Permanently delete appointment
router.delete("/appointment/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const [result] = await db.query(
      "DELETE FROM Appointment WHERE Appt_ID = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ message: "Failed to delete appointment" });
  }
});

// GET /api/booked-timeslots — Return booked time slots for a doctor on a date
router.get("/booked-timeslots", async (req, res) => {
  const { doctor, date } = req.query;

  if (!doctor || !date) {
    return res.status(400).json({ message: "Doctor and date are required" });
  }

  try {
    const [rows] = await db.query(
      "SELECT TIME(DOA) AS time FROM Appointment WHERE Doc_ID = ? AND DATE(DOA) = ? AND Status = 'booked'",
      [doctor, date]
    );

    const bookedSlots = rows.map(r => r.time);
    res.json(bookedSlots);
  } catch (err) {
    console.error("Error fetching booked slots:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
