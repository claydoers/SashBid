import { Router } from 'express';
import {
  createBid,
  getAllBids,
  getBidById,
  updateBid,
  deleteBid,
  getBidsByProject,
} from '../controllers/bid.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// All routes are protected
router.use(protect);

// Create a new bid
router.post('/', createBid);

// Get all bids
router.get('/', getAllBids);

// Get bid by ID
router.get('/:id', getBidById);

// Update bid
router.put('/:id', updateBid);

// Delete bid
router.delete('/:id', deleteBid);

// Get bids by project
router.get('/project/:projectId', getBidsByProject);

export default router; 