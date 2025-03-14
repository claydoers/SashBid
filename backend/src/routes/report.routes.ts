import express from 'express';
import { authenticateJWT } from '../middleware/auth';
import * as reportController from '../controllers/report.controller';

const router = express.Router();

// Apply authentication middleware to all report routes
router.use(authenticateJWT);

// Dashboard overview data
router.get('/dashboard', reportController.getDashboardData);

// Bid reports
router.get('/bids', reportController.getBidReports);
router.get('/bids/monthly', reportController.getMonthlyBidData);
router.get('/bids/status', reportController.getBidStatusDistribution);

// Project reports
router.get('/projects', reportController.getProjectReports);
router.get('/projects/status', reportController.getProjectStatusDistribution);
router.get('/projects/timeline', reportController.getProjectTimeline);

// Inventory reports
router.get('/inventory', reportController.getInventoryReports);
router.get('/inventory/category', reportController.getInventoryByCategory);

// Client reports
router.get('/clients', reportController.getClientReports);
router.get('/clients/top', reportController.getTopClients);
router.get('/clients/activity', reportController.getClientActivity);

export default router; 