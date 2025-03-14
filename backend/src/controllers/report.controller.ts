import { Request, Response } from 'express';
import Bid from '../models/bid.model';
import Project from '../models/project.model';
import Client from '../models/client.model';
import InventoryItem from '../models/inventory.model';
import mongoose from 'mongoose';

// Define month names array once to avoid redeclaration
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Get dashboard overview data
 */
export const getDashboardData = async (req: Request, res: Response) => {
  try {
    // Get total counts
    const totalBids = await Bid.countDocuments();
    const totalProjects = await Project.countDocuments();
    const totalClients = await Client.countDocuments();
    
    // Calculate total revenue (sum of all project values)
    const projectsAggregate = await Project.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$value' }
        }
      }
    ]);
    
    const totalRevenue = projectsAggregate.length > 0 ? projectsAggregate[0].totalRevenue : 0;
    
    // Get bid acceptance rate
    const acceptedBids = await Bid.countDocuments({ status: 'accepted' });
    const acceptanceRate = totalBids > 0 ? Math.round((acceptedBids / totalBids) * 100) : 0;
    
    // Get project completion rate
    const completedProjects = await Project.countDocuments({ status: 'completed' });
    const completionRate = totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0;
    
    // Get bid data for the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const bidData = await Bid.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: { 
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' }
          },
          total: { $sum: '$total' },
          accepted: {
            $sum: {
              $cond: [{ $eq: ['$status', 'accepted'] }, '$total', 0]
            }
          },
          rejected: {
            $sum: {
              $cond: [{ $eq: ['$status', 'rejected'] }, '$total', 0]
            }
          },
          pending: {
            $sum: {
              $cond: [{ $eq: ['$status', 'draft'] }, '$total', 0]
            }
          }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);
    
    // Format bid data for frontend
    const formattedBidData = bidData.map(item => ({
      month: MONTH_NAMES[item._id.month - 1],
      total: item.total,
      accepted: item.accepted,
      rejected: item.rejected,
      pending: item.pending
    }));
    
    // Get project status distribution
    const projectStatusData = await Project.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Format project status data for frontend
    const totalProjectCount = projectStatusData.reduce((sum, item) => sum + item.count, 0);
    const formattedProjectStatusData = projectStatusData.map(item => ({
      name: item._id.charAt(0).toUpperCase() + item._id.slice(1).replace('_', ' '),
      value: Math.round((item.count / totalProjectCount) * 100)
    }));
    
    // Get inventory data by category
    const inventoryData = await InventoryItem.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          value: { $sum: { $multiply: ['$price', '$quantity'] } }
        }
      }
    ]);
    
    // Format inventory data for frontend
    const formattedInventoryData = inventoryData.map(item => ({
      category: item._id.charAt(0).toUpperCase() + item._id.slice(1),
      count: item.count,
      value: item.value
    }));
    
    // Get top clients by project value
    const clientData = await Client.aggregate([
      {
        $lookup: {
          from: 'projects',
          localField: '_id',
          foreignField: 'client',
          as: 'projects'
        }
      },
      {
        $lookup: {
          from: 'bids',
          localField: '_id',
          foreignField: 'client',
          as: 'bids'
        }
      },
      {
        $project: {
          name: 1,
          projects: { $size: '$projects' },
          bids: { $size: '$bids' },
          value: { $sum: '$projects.value' }
        }
      },
      {
        $sort: { value: -1 }
      },
      {
        $limit: 5
      }
    ]);
    
    return res.status(200).json({
      totalBids,
      totalProjects,
      totalClients,
      totalRevenue,
      acceptanceRate,
      completionRate,
      bidData: formattedBidData,
      projectStatusData: formattedProjectStatusData,
      inventoryData: formattedInventoryData,
      clientData
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return res.status(500).json({ message: 'Error fetching dashboard data' });
  }
};

/**
 * Get bid reports
 */
export const getBidReports = async (req: Request, res: Response) => {
  try {
    const bids = await Bid.find()
      .populate('client', 'name')
      .populate('project', 'name')
      .sort({ createdAt: -1 });
    
    return res.status(200).json(bids);
  } catch (error) {
    console.error('Error fetching bid reports:', error);
    return res.status(500).json({ message: 'Error fetching bid reports' });
  }
};

/**
 * Get monthly bid data
 */
export const getMonthlyBidData = async (req: Request, res: Response) => {
  try {
    const monthsParam = req.query.months ? Number(req.query.months) : 6;
    const monthsAgo = new Date();
    monthsAgo.setMonth(monthsAgo.getMonth() - monthsParam);
    
    const bidData = await Bid.aggregate([
      {
        $match: {
          createdAt: { $gte: monthsAgo }
        }
      },
      {
        $group: {
          _id: { 
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' }
          },
          total: { $sum: '$total' },
          accepted: {
            $sum: {
              $cond: [{ $eq: ['$status', 'accepted'] }, '$total', 0]
            }
          },
          rejected: {
            $sum: {
              $cond: [{ $eq: ['$status', 'rejected'] }, '$total', 0]
            }
          },
          pending: {
            $sum: {
              $cond: [{ $eq: ['$status', 'draft'] }, '$total', 0]
            }
          }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);
    
    // Format data for frontend
    const formattedData = bidData.map(item => ({
      month: MONTH_NAMES[item._id.month - 1],
      total: item.total,
      accepted: item.accepted,
      rejected: item.rejected,
      pending: item.pending
    }));
    
    return res.status(200).json(formattedData);
  } catch (error) {
    console.error('Error fetching monthly bid data:', error);
    return res.status(500).json({ message: 'Error fetching monthly bid data' });
  }
};

/**
 * Get bid status distribution
 */
export const getBidStatusDistribution = async (req: Request, res: Response) => {
  try {
    const bidStatusData = await Bid.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Format data for frontend
    const totalBids = bidStatusData.reduce((sum, item) => sum + item.count, 0);
    const formattedData = bidStatusData.map(item => ({
      name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
      value: Math.round((item.count / totalBids) * 100)
    }));
    
    return res.status(200).json(formattedData);
  } catch (error) {
    console.error('Error fetching bid status distribution:', error);
    return res.status(500).json({ message: 'Error fetching bid status distribution' });
  }
};

/**
 * Get project reports
 */
export const getProjectReports = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find()
      .populate('client', 'name')
      .sort({ createdAt: -1 });
    
    return res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching project reports:', error);
    return res.status(500).json({ message: 'Error fetching project reports' });
  }
};

/**
 * Get project status distribution
 */
export const getProjectStatusDistribution = async (req: Request, res: Response) => {
  try {
    const projectStatusData = await Project.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Format data for frontend
    const totalProjects = projectStatusData.reduce((sum, item) => sum + item.count, 0);
    const formattedData = projectStatusData.map(item => ({
      name: item._id.charAt(0).toUpperCase() + item._id.slice(1).replace('_', ' '),
      value: Math.round((item.count / totalProjects) * 100)
    }));
    
    return res.status(200).json(formattedData);
  } catch (error) {
    console.error('Error fetching project status distribution:', error);
    return res.status(500).json({ message: 'Error fetching project status distribution' });
  }
};

/**
 * Get project timeline
 */
export const getProjectTimeline = async (req: Request, res: Response) => {
  try {
    const monthsParam = req.query.months ? Number(req.query.months) : 6;
    const monthsAgo = new Date();
    monthsAgo.setMonth(monthsAgo.getMonth() - monthsParam);
    
    const projectData = await Project.aggregate([
      {
        $match: {
          createdAt: { $gte: monthsAgo }
        }
      },
      {
        $group: {
          _id: { 
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' }
          },
          completed: {
            $sum: {
              $cond: [{ $eq: ['$status', 'completed'] }, 1, 0]
            }
          },
          inProgress: {
            $sum: {
              $cond: [{ $eq: ['$status', 'in_progress'] }, 1, 0]
            }
          }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);
    
    // Format data for frontend
    const formattedData = projectData.map(item => ({
      month: MONTH_NAMES[item._id.month - 1],
      completed: item.completed,
      inProgress: item.inProgress
    }));
    
    return res.status(200).json(formattedData);
  } catch (error) {
    console.error('Error fetching project timeline:', error);
    return res.status(500).json({ message: 'Error fetching project timeline' });
  }
};

/**
 * Get inventory reports
 */
export const getInventoryReports = async (req: Request, res: Response) => {
  try {
    const inventory = await InventoryItem.find().sort({ type: 1, name: 1 });
    
    return res.status(200).json(inventory);
  } catch (error) {
    console.error('Error fetching inventory reports:', error);
    return res.status(500).json({ message: 'Error fetching inventory reports' });
  }
};

/**
 * Get inventory by category
 */
export const getInventoryByCategory = async (req: Request, res: Response) => {
  try {
    const inventoryData = await InventoryItem.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          value: { $sum: { $multiply: ['$price', '$quantity'] } }
        }
      }
    ]);
    
    // Format data for frontend
    const formattedData = inventoryData.map(item => ({
      category: item._id.charAt(0).toUpperCase() + item._id.slice(1),
      count: item.count,
      value: item.value
    }));
    
    return res.status(200).json(formattedData);
  } catch (error) {
    console.error('Error fetching inventory by category:', error);
    return res.status(500).json({ message: 'Error fetching inventory by category' });
  }
};

/**
 * Get client reports
 */
export const getClientReports = async (req: Request, res: Response) => {
  try {
    const clients = await Client.find().sort({ name: 1 });
    
    return res.status(200).json(clients);
  } catch (error) {
    console.error('Error fetching client reports:', error);
    return res.status(500).json({ message: 'Error fetching client reports' });
  }
};

/**
 * Get top clients by project value
 */
export const getTopClients = async (req: Request, res: Response) => {
  try {
    const limitParam = req.query.limit ? Number(req.query.limit) : 5;
    
    const clientData = await Client.aggregate([
      {
        $lookup: {
          from: 'projects',
          localField: '_id',
          foreignField: 'client',
          as: 'projects'
        }
      },
      {
        $project: {
          name: 1,
          projectCount: { $size: '$projects' },
          value: { $sum: '$projects.value' }
        }
      },
      {
        $sort: { value: -1 }
      },
      {
        $limit: limitParam
      }
    ]);
    
    return res.status(200).json(clientData);
  } catch (error) {
    console.error('Error fetching top clients:', error);
    return res.status(500).json({ message: 'Error fetching top clients' });
  }
};

/**
 * Get client activity (bids and projects)
 */
export const getClientActivity = async (req: Request, res: Response) => {
  try {
    const limitParam = req.query.limit ? Number(req.query.limit) : 5;
    
    const clientData = await Client.aggregate([
      {
        $lookup: {
          from: 'projects',
          localField: '_id',
          foreignField: 'client',
          as: 'projects'
        }
      },
      {
        $lookup: {
          from: 'bids',
          localField: '_id',
          foreignField: 'client',
          as: 'bids'
        }
      },
      {
        $project: {
          name: 1,
          projects: { $size: '$projects' },
          bids: { $size: '$bids' },
          value: { $sum: '$projects.value' }
        }
      },
      {
        $sort: { bids: -1 }
      },
      {
        $limit: limitParam
      }
    ]);
    
    return res.status(200).json(clientData);
  } catch (error) {
    console.error('Error fetching client activity:', error);
    return res.status(500).json({ message: 'Error fetching client activity' });
  }
}; 