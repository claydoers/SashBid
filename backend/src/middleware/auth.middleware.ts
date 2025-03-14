import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

// JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Interface for decoded token
interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

/**
 * Middleware to protect routes that require authentication
 */
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    // Get token from Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      res.status(401).json({ message: 'Not authorized, no token provided' });
      return;
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

    // Find user by id
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(401).json({ message: 'Not authorized, user not found' });
      return;
    }

    // Attach user to request object
    (req as any).user = {
      id: user._id,
      role: user.role,
    };

    next();
  } catch {
    res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};

/**
 * Middleware to restrict access to specific roles
 */
export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Check if user role is included in the allowed roles
    if (!roles.includes((req as any).user.role)) {
      res.status(403).json({
        message: 'You do not have permission to perform this action',
      });
      return;
    }

    next();
  };
}; 