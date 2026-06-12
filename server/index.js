require("dotenv").config();
const express = require("express");
const { Resend } = require("resend");
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",
  "https://girija-dietician.vercel.app",
  "https://dietician-cafh.onrender.com",
];

const app = express();
app.use(cors({
  origin: (origin, callback) => {
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

if (!process.env.RESEND_API_KEY) {
  console.error("Missing RESEND_API_KEY environment variable. Mail sending will fail.");
}

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, age, weight, height, service, reason, message } = req.body;
  console.log("Received /api/contact request", { name, email, phone, age, weight, height, service, reason, message });

  if (!name || !email || !phone) {
    console.warn("Contact submission missing required fields", { name, email, phone });
    return res.status(400).json({ error: "Name, email, and phone are required." });
  }

  try {
    console.log("Sending email via Resend...");
    const { error } = await resend.emails.send({
      from: "Dt. Girija Website <onboarding@resend.dev>",
      to: "dietitiangirija@gmail.com",
      replyTo: email,
      subject: `New Consultation Booking — ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>New Consultation Booking</title>
        </head>
        <body style="margin:0;padding:0;background-color:#f4f1ec;font-family:'Georgia',serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f1ec;padding:40px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

                  <!-- Header -->
                  <tr>
                    <td style="background-color:#3a5a40;padding:36px 40px;text-align:center;">
                      <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:1px;">Dt. Girija</h1>
                      <p style="margin:6px 0 0;color:#a8c5a0;font-size:13px;letter-spacing:2px;text-transform:uppercase;">Nutrition & Wellness</p>
                    </td>
                  </tr>

                  <!-- Title Bar -->
                  <tr>
                    <td style="background-color:#f4e6d3;padding:20px 40px;border-bottom:1px solid #e8d5bc;">
                      <h2 style="margin:0;color:#3a5a40;font-size:18px;font-weight:700;">📋 New Consultation Booking</h2>
                      <p style="margin:4px 0 0;color:#888;font-size:12px;">Submitted via girija-dietician.vercel.app</p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:32px 40px;">

                      <!-- Client Info -->
                      <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#3a5a40;text-transform:uppercase;letter-spacing:1px;">Client Information</p>
                      <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:10px;overflow:hidden;border:1px solid #ede8e0;">
                        <tr style="background-color:#f9f6f1;">
                          <td style="padding:12px 16px;font-size:13px;color:#888;width:35%;border-bottom:1px solid #ede8e0;">Full Name</td>
                          <td style="padding:12px 16px;font-size:13px;color:#2d2d2d;font-weight:600;border-bottom:1px solid #ede8e0;">${name}</td>
                        </tr>
                        <tr>
                          <td style="padding:12px 16px;font-size:13px;color:#888;border-bottom:1px solid #ede8e0;">Email</td>
                          <td style="padding:12px 16px;font-size:13px;color:#2d2d2d;font-weight:600;border-bottom:1px solid #ede8e0;"><a href="mailto:${email}" style="color:#3a5a40;text-decoration:none;">${email}</a></td>
                        </tr>
                        <tr style="background-color:#f9f6f1;">
                          <td style="padding:12px 16px;font-size:13px;color:#888;">Phone</td>
                          <td style="padding:12px 16px;font-size:13px;color:#2d2d2d;font-weight:600;">${phone}</td>
                        </tr>
                      </table>

                      <!-- Body Stats -->
                      <p style="margin:28px 0 16px;font-size:13px;font-weight:700;color:#3a5a40;text-transform:uppercase;letter-spacing:1px;">Body Stats</p>
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="33%" style="padding-right:8px;">
                            <div style="background-color:#f4e6d3;border-radius:10px;padding:16px;text-align:center;">
                              <p style="margin:0;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:1px;">Age</p>
                              <p style="margin:6px 0 0;font-size:20px;font-weight:700;color:#3a5a40;">${age || "—"}</p>
                            </div>
                          </td>
                          <td width="33%" style="padding-right:8px;">
                            <div style="background-color:#f4e6d3;border-radius:10px;padding:16px;text-align:center;">
                              <p style="margin:0;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:1px;">Weight</p>
                              <p style="margin:6px 0 0;font-size:20px;font-weight:700;color:#3a5a40;">${weight || "—"}</p>
                            </div>
                          </td>
                          <td width="33%">
                            <div style="background-color:#f4e6d3;border-radius:10px;padding:16px;text-align:center;">
                              <p style="margin:0;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:1px;">Height</p>
                              <p style="margin:6px 0 0;font-size:20px;font-weight:700;color:#3a5a40;">${height || "—"}</p>
                            </div>
                          </td>
                        </tr>
                      </table>

                      <!-- Service -->
                      <p style="margin:28px 0 16px;font-size:13px;font-weight:700;color:#3a5a40;text-transform:uppercase;letter-spacing:1px;">Program Interest</p>
                      <div style="background-color:#eef3f0;border-left:4px solid #3a5a40;border-radius:0 10px 10px 0;padding:14px 18px;">
                        <p style="margin:0;font-size:14px;color:#2d2d2d;font-weight:600;">${service || "Not specified"}</p>
                      </div>

                      <!-- Reason -->
                      <p style="margin:28px 0 16px;font-size:13px;font-weight:700;color:#3a5a40;text-transform:uppercase;letter-spacing:1px;">Reason for Booking</p>
                      <div style="background-color:#f9f6f1;border-radius:10px;padding:16px 18px;border:1px solid #ede8e0;">
                        <p style="margin:0;font-size:13px;color:#555;line-height:1.7;">${reason || "Not provided"}</p>
                      </div>

                      <!-- Message -->
                      <p style="margin:28px 0 16px;font-size:13px;font-weight:700;color:#3a5a40;text-transform:uppercase;letter-spacing:1px;">Health Goals / Conditions</p>
                      <div style="background-color:#f9f6f1;border-radius:10px;padding:16px 18px;border:1px solid #ede8e0;">
                        <p style="margin:0;font-size:13px;color:#555;line-height:1.7;">${message || "Not provided"}</p>
                      </div>

                      <!-- Reply CTA -->
                      <div style="margin-top:32px;text-align:center;">
                        <a href="mailto:${email}" style="display:inline-block;background-color:#3a5a40;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:50px;font-size:14px;font-weight:700;letter-spacing:0.5px;">Reply to ${name}</a>
                      </div>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color:#f4f1ec;padding:24px 40px;text-align:center;border-top:1px solid #ede8e0;">
                      <p style="margin:0;font-size:12px;color:#aaa;">This email was sent from the contact form on <strong>girija-dietician.vercel.app/</strong></p>
                      <p style="margin:6px 0 0;font-size:12px;color:#aaa;">© 2026 Dt. Girija · All rights reserved</p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend returned error", error);
      throw error;
    }

    console.log("Email sent successfully");
    res.json({ success: true, message: "Email sent successfully." });
  } catch (err) {
    console.error("Mail error:", err);
    const safeDetails = process.env.NODE_ENV === "production" ? undefined : err?.message;
    res.status(500).json({ error: "Failed to send email. Try again.", details: safeDetails });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));