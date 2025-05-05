const ALLOWED_EMAILS = [
    'samueldarius1470@gmail.com', 
];

const express = require('express'); 
const { OAuth2Client } = require('google-auth-library'); 
const cors = require('cors'); 

const app = express(); 
const port = process.env.PORT || 3000; 

app.use(cors()); 
app.use(express.json()); 

const CLIENT_ID = '554277204276-195mhsiv0b5id7b6mmmguvtt1eekjc7a.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID); 

app.post('/api/login', async (req, res) => {
    try {
        const token = req.body.token; 
        const ticket = await client.verifyIdToken({
            idToken: token, 
            audience: CLIENT_ID
        });
        const payload = ticket.getPayload();
        console.log("Token payload email:", payload.email);
        
        // Normalize email comparison
        const userEmail = payload.email.trim().toLowerCase();
        const allowedEmails = ALLOWED_EMAILS.map(email => email.trim().toLowerCase());
        console.log("Checking if user is allowed:", userEmail);
        if (!allowedEmails.includes(userEmail)) {
            console.log("User not allowed:", userEmail);
            return res.status(403).json({ success: false, message: 'Not Authorized' });
        }
        console.log("User allowed:", userEmail);
        return res.json({
            success: true, 
            message: 'Token is valid', 
            user: {
                email: payload.email, 
                name: payload.name,
            }
        });
    } catch (error) {
        console.error('Token verification error:', error); 
        return res.status(401).json({
            success: false, 
            message: 'Invalid token'
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
