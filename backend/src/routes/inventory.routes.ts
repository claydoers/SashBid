import { Router } from 'express';
import {
  createInventoryItem,
  getAllInventoryItems,
  getInventoryItemById,
  updateInventoryItem,
  deleteInventoryItem,
  updateInventoryQuantity,
  getLowStockItems,
} from '../controllers/inventory.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// All routes are protected
router.use(protect);

// Create a new inventory item
router.post('/', createInventoryItem);

// Get all inventory items
router.get('/', getAllInventoryItems);

// Get inventory item by ID
router.get('/:id', getInventoryItemById);

// Update inventory item
router.put('/:id', updateInventoryItem);

// Delete inventory item
router.delete('/:id', deleteInventoryItem);

// Update inventory quantity
router.patch('/:id/quantity', updateInventoryQuantity);

// Get low stock items
router.get('/low-stock', getLowStockItems);

export default router; 