// Download env data
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';
import Stripe from 'stripe';

const app = express();
const port = 5000;

// Settings CORS, for POST requests from frontend
app.use(cors());

// parsing body of json request
app.use(bodyParser.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// Calculate the order amount function for Stripe
const calculateOrderAmount = (items) => {
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  let total = 0;
  items.forEach((item) => {
    total += item.amount;
  });
  return total;
};

// Stripe payment intent endpoint
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { items } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd",
      // Enable automatic payment methods
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({ error: 'Failed to create payment intent' });
  }
});

// Endpoint to check payment status
app.get("/check-payment-status/:paymentId", async (req, res) => {
  try {
    const { paymentId } = req.params;
    
    // Retrieve the payment intent using your secret key
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
    
    // Send back only what's needed (status and ID)
    res.json({
      status: paymentIntent.status,
      amount: paymentIntent.amount,
    });
  } catch (error) {
    console.error("Error checking payment status:", error);
    res.status(500).send({ error: "Failed to check payment status" });
  }
});

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
