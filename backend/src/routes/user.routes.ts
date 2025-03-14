import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  changePassword,
} from '../controllers/user.controller';
import { protect, restrictTo } from '../middleware/auth.middleware';

const router = Router();

// All routes are protected
router.use(protect);

// Get all users (admin only)
router.get('/', restrictTo('admin'), getAllUsers);

// Get user by ID
router.get('/:id', getUserById);

// Update user
router.put('/:id', updateUser);

// Delete user (admin only)
router.delete('/:id', restrictTo('admin'), deleteUser);

// Change password
router.post('/change-password', changePassword);

export default router; 