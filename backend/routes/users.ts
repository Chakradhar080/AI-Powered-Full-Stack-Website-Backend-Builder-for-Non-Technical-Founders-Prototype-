import express from 'express';
import { 
  getAllUsers, 
  createUser, 
  getUser, 
  updateUser, 
  deleteUser 
} from '../controllers/userController';

const router = express.Router();

// Get all users
router.get('/', getAllUsers);

// Create a new user
router.post('/', createUser);

// Get a specific user
router.get('/:id', getUser);

// Update a user
router.put('/:id', updateUser);

// Delete a user
router.delete('/:id', deleteUser);

export default router;