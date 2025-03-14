import { Request, Response } from 'express';
import User from '../models/user.model';

// Get all users (admin only)
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select('-password');
    
    res.status(200).json({
      count: users.length,
      users,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error fetching users',
      error: error.message,
    });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    res.status(200).json({ user });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error fetching user',
      error: error.message,
    });
  }
};

// Update user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, company, phone } = req.body;
    const userId = req.params.id;
    
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    // Check if user is authorized to update this profile
    // Only allow users to update their own profile unless they're an admin
    const requestingUserId = (req as any).user.id;
    const isAdmin = (req as any).user.role === 'admin';
    
    if (userId !== requestingUserId && !isAdmin) {
      res.status(403).json({ 
        message: 'You do not have permission to update this user profile' 
      });
      return;
    }
    
    // If email is being changed, check if it's already in use
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: 'Email already in use' });
        return;
      }
    }
    
    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, company, phone },
      { new: true, runValidators: true }
    ).select('-password');
    
    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error updating user',
      error: error.message,
    });
  }
};

// Delete user (admin only)
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    await User.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error deleting user',
      error: error.message,
    });
  }
};

// Change password
export const changePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = (req as any).user.id;
    
    // Find user
    const user = await User.findById(userId).select('+password');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    // Check if current password is correct
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Current password is incorrect' });
      return;
    }
    
    // Update password
    user.password = newPassword;
    await user.save();
    
    res.status(200).json({
      message: 'Password changed successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error changing password',
      error: error.message,
    });
  }
}; 