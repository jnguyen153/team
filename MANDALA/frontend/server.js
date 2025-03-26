// Download env data
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 5000;

// Settings CORS, for POST reequests from frontend
app.use(cors());

// parsing body of json request
app.use(bodyParser.json());

// Settings for Nodemailer (SMTP)
const transporter = nodemailer.createTransport({
  service: 'gmail', // could be used diffent servicee
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/send-email', async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Email settings. Data taken from .env
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECIPIENT_EMAIL,
    subject: `Message from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `,
  };

  try {
    // Sending email
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
});

// Running server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
