// server/routes/contact.js
import express from 'express';
import nodemailer from 'nodemailer';


const contuctRouter = express.Router();

contuctRouter.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "", 
        pass: ""  
      },
    });

    // Email content
    const mailOptions = {
      from: email,
      to: "mhmdfshn16@gmail.com",
      subject: `New Contact Message from ${name}`,
      html: `
        <h3>New Message Received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    console.error("Email send error:", err);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
});

export default contuctRouter;
