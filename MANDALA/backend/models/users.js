const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://<your-project-id>.firebaseio.com',
  });
}

const auth = admin.auth();

const createUser = async (email, password, displayName) => {
  try {
    const userRecord = await auth.createUser({
      email,
      password,
      displayName,
    });
    console.log('Successfully created new user:', userRecord.uid);
    return userRecord;
  } catch (error) {
    console.error('Error creating new user:', error);
    throw error;
  }
};

const getUser = async (uid) => {
  try {
    const userRecord = await auth.getUser(uid);
    console.log('Successfully fetched user data:', userRecord.toJSON());
    return userRecord;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

const deleteUser = async (uid) => {
  try {
    await auth.deleteUser(uid);
    console.log('Successfully deleted user');
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

module.exports = {
  createUser,
  getUser,
  deleteUser,
};
