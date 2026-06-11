require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,       // your Gmail: dietitiangirija@gmail.com
    pass: process.env.GMAIL_APP_PASS,   // Gmail App Password (NOT your login password)
  },
});

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, age, weight, height, service, reason, message } = req.body;

  // Basic validation — don't trust the frontend
  if (!name || !email || !phone) {
    return res.status(400).json({ error: "Name, email, and phone are required." });
  }

  const mailOptions = {
    from: `"Dt. Girija Website" <${process.env.GMAIL_USER}>`,
    to: "irfanjankhan7860@gmail.com",
    replyTo: email,
    subject: `New Consultation Booking — ${name}`,
    html: `
      <h2>New Consultation Request</h2>
      <table cellpadding="8" style="border-collapse:collapse; width:100%; font-family:sans-serif;">
        <tr><td><b>Name</b></td><td>${name}</td></tr>
        <tr><td><b>Email</b></td><td>${email}</td></tr>
        <tr><td><b>Phone</b></td><td>${phone}</td></tr>
        <tr><td><b>Age</b></td><td>${age || "—"}</td></tr>
        <tr><td><b>Weight</b></td><td>${weight || "—"}</td></tr>
        <tr><td><b>Height</b></td><td>${height || "—"}</td></tr>
        <tr><td><b>Service</b></td><td>${service || "—"}</td></tr>
        <tr><td><b>Reason</b></td><td>${reason || "—"}</td></tr>
        <tr><td><b>Message</b></td><td>${message || "—"}</td></tr>
      </table>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent successfully." });
  } catch (err) {
    console.error("Mail error:", err);
    res.status(500).json({ error: "Failed to send email. Try again." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));