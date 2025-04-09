require('dotenv').config();
const firebase = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const admin = require('firebase-admin');

// Mock database
const users = [
  // Example user data
  {
    username: 'John Doe',
    email: 'john.doe.01@hotmail.com',
    password: 'password123',
    id: 1,
  },
  {
    username: 'Jane Smith',
    email: 'jane.smith.02@gmail.com',
    password: 'securePass456',
    id: 2,
  },
  {
    username: 'Alice Johnson',
    email: 'alice.johnson.03@yahoo.com',
    password: 'alicePass789',
    id: 3,
  },
  {
    username: 'Bob Brown',
    email: 'bob.brown.04@outlook.com',
    password: 'bobSecure101',
    id: 4,
  },
];

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // Use service account credentials
  });
}

// Service function to get all users
const getAllUsers = (req, res) => {
  res.json(users);
};

// Service function to get a single user by ID
const getUserById = (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id, 10));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};

// Service function to create a new user
const createUser = (req, res) => {
  const auth = getAuth();

  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ message: 'Email, password, and username are required' });
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      const newUser = {
        id: users.length + 1,
        username,
        email,
        password, // Note: Storing plain passwords is not recommended. Use hashing in production.
      };
      users.push(newUser);
      res.status(201).json(newUser);
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
};

// Service function to update a user by ID
const updateUser = (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id, 10));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  Object.assign(user, req.body);
  res.json(user);
};

// Service function to delete a user by ID
const deleteUser = (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id, 10));
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users.splice(userIndex, 1);
  res.status(204).send();
};

// Service function for Google Sign-In
const googleSignIn = async (req, res) => {
  const { idToken } = req.body; // Expect the frontend to send the ID token

  if (!idToken) {
    return res.status(400).json({ message: 'ID token is required' });
  }

  try {
    // Verify the ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, name } = decodedToken;

    // Check if the user already exists in the mock database
    let existingUser = users.find((u) => u.email === email);
    if (!existingUser) {
      // Add the new user to the mock database
      existingUser = {
        id: users.length + 1,
        username: name || 'Google User',
        email,
        password: null, // Password is not stored for Google Sign-In
      };
      users.push(existingUser);
    }

    res.status(200).json(existingUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  googleSignIn,
};
