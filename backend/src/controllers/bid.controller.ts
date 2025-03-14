import { Request, Response } from 'express';
import Bid from '../models/bid.model';
import Project from '../models/project.model';

// Create a new bid
export const createBid = async (req: Request, res: Response): Promise<void> => {
  try {
    const { project, client, items, tax, status, dueDate, notes } = req.body;
    
    // Add the current user as the creator
    const createdBy = (req as any).user.id;
    
    // Calculate subtotal and total
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.quantity * item.unitPrice), 0);
    const total = subtotal + (subtotal * (tax / 100));
    
    const bid = new Bid({
      project,
      client,
      items,
      subtotal,
      tax,
      total,
      status,
      dueDate,
      notes,
      createdBy,
    });
    
    const savedBid = await bid.save();
    
    // Populate references for the response
    const populatedBid = await Bid.findById(savedBid._id)
      .populate('project', 'name')
      .populate('client', 'name email')
      .populate('createdBy', 'name email');
    
    res.status(201).json({
      message: 'Bid created successfully',
      bid: populatedBid,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error creating bid',
      error: error.message,
    });
  }
};

// Get all bids
export const getAllBids = async (req: Request, res: Response): Promise<void> => {
  try {
    // Parse query parameters for filtering
    const { project, client, status, minTotal, maxTotal } = req.query;
    
    // Build filter object
    const filter: any = {};
    
    if (project) {
      filter.project = project;
    }
    
    if (client) {
      filter.client = client;
    }
    
    if (status) {
      filter.status = status;
    }
    
    // Total range filtering
    if (minTotal || maxTotal) {
      filter.total = {};
      
      if (minTotal) {
        filter.total.$gte = Number(minTotal);
      }
      
      if (maxTotal) {
        filter.total.$lte = Number(maxTotal);
      }
    }
    
    // Get bids with populated references
    const bids = await Bid.find(filter)
      .populate('project', 'name')
      .populate('client', 'name email phone')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      count: bids.length,
      bids,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error fetching bids',
      error: error.message,
    });
  }
};

// Get bid by ID
export const getBidById = async (req: Request, res: Response): Promise<void> => {
  try {
    const bid = await Bid.findById(req.params.id)
      .populate('project', 'name description')
      .populate('client', 'name email phone address')
      .populate('createdBy', 'name email');
    
    if (!bid) {
      res.status(404).json({ message: 'Bid not found' });
      return;
    }
    
    res.status(200).json({ bid });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error fetching bid',
      error: error.message,
    });
  }
};

// Update bid
export const updateBid = async (req: Request, res: Response): Promise<void> => {
  try {
    const { project, client, items, tax, status, dueDate, notes } = req.body;
    
    // Check if bid exists
    const bid = await Bid.findById(req.params.id);
    if (!bid) {
      res.status(404).json({ message: 'Bid not found' });
      return;
    }
    
    // Calculate subtotal and total if items or tax are updated
    let subtotal = bid.subtotal;
    let total = bid.total;
    
    if (items) {
      subtotal = items.reduce((sum: number, item: any) => sum + (item.quantity * item.unitPrice), 0);
      total = subtotal + (subtotal * ((tax || bid.tax) / 100));
    } else if (tax) {
      total = subtotal + (subtotal * (tax / 100));
    }
    
    // Update bid
    const updatedBid = await Bid.findByIdAndUpdate(
      req.params.id,
      {
        project,
        client,
        items,
        subtotal,
        tax,
        total,
        status,
        dueDate,
        notes,
      },
      { new: true, runValidators: true }
    )
      .populate('project', 'name')
      .populate('client', 'name email phone')
      .populate('createdBy', 'name email');
    
    res.status(200).json({
      message: 'Bid updated successfully',
      bid: updatedBid,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error updating bid',
      error: error.message,
    });
  }
};

// Delete bid
export const deleteBid = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if bid exists
    const bid = await Bid.findById(req.params.id);
    if (!bid) {
      res.status(404).json({ message: 'Bid not found' });
      return;
    }
    
    // Delete bid
    await Bid.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      message: 'Bid deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error deleting bid',
      error: error.message,
    });
  }
};

// Get bids by project
export const getBidsByProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const projectId = req.params.projectId;
    
    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    
    // Get bids for the project
    const bids = await Bid.find({ project: projectId })
      .populate('client', 'name email phone')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      count: bids.length,
      bids,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error fetching bids for project',
      error: error.message,
    });
  }
}; 