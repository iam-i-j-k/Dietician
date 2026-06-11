require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",
  "https://girija-dietician.vercel.app",
  // Add deployed API origin so browser requests from that host aren't blocked
  "https://dietician-cafh.onrender.com",
];
const app = express();
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, curl) or matched origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  methods: ["POST"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,       // your Gmail: dietitiangirija@gmail.com
    pass: process.env.GMAIL_APP_PASS,   // Gmail App Password (NOT your login password)
  },
});

// Warn early if required env vars are missing
if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASS) {
  console.error(
    "Missing GMAIL_USER or GMAIL_APP_PASS environment variables. Mail sending will fail."
  );
}

// Verify transporter at startup so deployment logs show mailer readiness
transporter.verify((err, success) => {
  if (err) {
    console.error("Nodemailer verification failed:", err);
  } else {
    console.log("Nodemailer ready to send messages");
  }
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
    // Include a small hint when not in production to aid debugging
    const safeDetails = process.env.NODE_ENV === "production" ? undefined : err && err.message;
    res.status(500).json({ error: "Failed to send email. Try again.", details: safeDetails });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));