const express = require('express');
const {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  createUser,
  googleSignIn,
} = require('../controllers/userController');

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', googleSignIn);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);

module.exports = router;
