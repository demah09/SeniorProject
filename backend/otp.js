// otp.js

const express = require("express");
const router = express.Router();
const db = require("./db");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Send 4-digit OTP
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  try {
    // Check if the email exists in the Patient table
    const [check] = await db.query("SELECT * FROM Patient WHERE email = ?", [email]);
    if (check.length === 0) {
      return res.status(404).json({ message: "Email not found in the system." });
    }

    // Remove any existing OTPs for this email
    await db.query("DELETE FROM otp_verification WHERE email = ?", [email]);

    // Store new OTP
    await db.query("INSERT INTO otp_verification (email, otp) VALUES (?, ?)", [email, otp]);

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your 4-digit OTP code is: ${otp}`,
    });

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// Verify OTP
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const [result] = await db.query(
      "SELECT * FROM otp_verification WHERE email = ? AND otp = ?",
      [email, otp]
    );

    if (result.length > 0) {
      res.json({ verified: true });
    } else {
      res.status(400).json({ verified: false, message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Failed to verify OTP" });
  }
});

module.exports = router;
