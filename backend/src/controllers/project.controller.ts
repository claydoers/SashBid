import { Request, Response } from 'express';
import Project from '../models/project.model';

// Create a new project
export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, client, status, startDate, endDate, value, notes } = req.body;
    
    // Add the current user as the creator
    const createdBy = (req as any).user.id;
    
    const project = new Project({
      name,
      description,
      client,
      status,
      startDate,
      endDate,
      value,
      notes,
      createdBy,
    });
    
    const savedProject = await project.save();
    
    res.status(201).json({
      message: 'Project created successfully',
      project: savedProject,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error creating project',
      error: error.message,
    });
  }
};

// Get all projects
export const getAllProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    // Parse query parameters for filtering
    const { status, client, startDateFrom, startDateTo, search } = req.query;
    
    // Build filter object
    const filter: any = {};
    
    if (status) {
      filter.status = status;
    }
    
    if (client) {
      filter.client = client;
    }
    
    // Date range filtering
    if (startDateFrom || startDateTo) {
      filter.startDate = {};
      
      if (startDateFrom) {
        filter.startDate.$gte = new Date(startDateFrom as string);
      }
      
      if (startDateTo) {
        filter.startDate.$lte = new Date(startDateTo as string);
      }
    }
    
    // Text search
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    
    // Get projects with populated client data
    const projects = await Project.find(filter)
      .populate('client', 'name email phone')
      .populate('createdBy', 'name email');
    
    res.status(200).json({
      count: projects.length,
      projects,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error fetching projects',
      error: error.message,
    });
  }
};

// Get project by ID
export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('client', 'name email phone address')
      .populate('createdBy', 'name email');
    
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    
    res.status(200).json({ project });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error fetching project',
      error: error.message,
    });
  }
};

// Update project
export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, client, status, startDate, endDate, value, notes } = req.body;
    
    // Check if project exists
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    
    // Update project
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { name, description, client, status, startDate, endDate, value, notes },
      { new: true, runValidators: true }
    )
      .populate('client', 'name email phone')
      .populate('createdBy', 'name email');
    
    res.status(200).json({
      message: 'Project updated successfully',
      project: updatedProject,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error updating project',
      error: error.message,
    });
  }
};

// Delete project
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if project exists
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    
    // Delete project
    await Project.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      message: 'Project deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error deleting project',
      error: error.message,
    });
  }
}; 