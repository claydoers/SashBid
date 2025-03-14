import { Request, Response } from 'express';
import Client from '../models/client.model';

// Create a new client
export const createClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, address, contactPersons, notes } = req.body;
    
    // Add the current user as the creator
    const createdBy = (req as any).user.id;
    
    // Check if client with the same email already exists
    if (email) {
      const existingClient = await Client.findOne({ email });
      if (existingClient) {
        res.status(400).json({ message: 'Client with this email already exists' });
        return;
      }
    }
    
    const client = new Client({
      name,
      email,
      phone,
      address,
      contactPersons,
      notes,
      createdBy,
    });
    
    const savedClient = await client.save();
    
    res.status(201).json({
      message: 'Client created successfully',
      client: savedClient,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error creating client',
      error: error.message,
    });
  }
};

// Get all clients
export const getAllClients = async (req: Request, res: Response): Promise<void> => {
  try {
    // Parse query parameters for filtering and searching
    const { search } = req.query;
    
    // Build filter object
    const filter: any = {};
    
    // Text search
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { 'address.city': { $regex: search, $options: 'i' } },
        { 'address.state': { $regex: search, $options: 'i' } },
      ];
    }
    
    // Get clients with populated creator data
    const clients = await Client.find(filter)
      .populate('createdBy', 'name email')
      .sort({ name: 1 });
    
    res.status(200).json({
      count: clients.length,
      clients,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error fetching clients',
      error: error.message,
    });
  }
};

// Get client by ID
export const getClientById = async (req: Request, res: Response): Promise<void> => {
  try {
    const client = await Client.findById(req.params.id)
      .populate('createdBy', 'name email');
    
    if (!client) {
      res.status(404).json({ message: 'Client not found' });
      return;
    }
    
    res.status(200).json({ client });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error fetching client',
      error: error.message,
    });
  }
};

// Update client
export const updateClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, address, contactPersons, notes } = req.body;
    
    // Check if client exists
    const client = await Client.findById(req.params.id);
    if (!client) {
      res.status(404).json({ message: 'Client not found' });
      return;
    }
    
    // If email is being changed, check if it's already in use
    if (email && email !== client.email) {
      const existingClient = await Client.findOne({ email });
      if (existingClient) {
        res.status(400).json({ message: 'Email already in use by another client' });
        return;
      }
    }
    
    // Update client
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, address, contactPersons, notes },
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');
    
    res.status(200).json({
      message: 'Client updated successfully',
      client: updatedClient,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error updating client',
      error: error.message,
    });
  }
};

// Delete client
export const deleteClient = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if client exists
    const client = await Client.findById(req.params.id);
    if (!client) {
      res.status(404).json({ message: 'Client not found' });
      return;
    }
    
    // Delete client
    await Client.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      message: 'Client deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error deleting client',
      error: error.message,
    });
  }
};

// Add contact person to client
export const addContactPerson = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, position, email, phone } = req.body;
    
    // Check if client exists
    const client = await Client.findById(req.params.id);
    if (!client) {
      res.status(404).json({ message: 'Client not found' });
      return;
    }
    
    // Add contact person
    client.contactPersons.push({
      name,
      position,
      email,
      phone,
    });
    
    await client.save();
    
    res.status(200).json({
      message: 'Contact person added successfully',
      client,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error adding contact person',
      error: error.message,
    });
  }
};

// Remove contact person from client
export const removeContactPerson = async (req: Request, res: Response): Promise<void> => {
  try {
    const contactPersonId = req.params.contactPersonId;
    const client = await Client.findById(req.params.id);
    
    if (!client) {
      res.status(404).json({ message: 'Client not found' });
      return;
    }
    
    // Find the index of the contact person
    const contactIndex = client.contactPersons.findIndex(
      (_, index) => index.toString() === contactPersonId
    );
    
    if (contactIndex === -1) {
      res.status(404).json({ message: 'Contact person not found' });
      return;
    }
    
    // Remove the contact person
    client.contactPersons.splice(contactIndex, 1);
    await client.save();
    
    res.status(200).json({ message: 'Contact person removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing contact person', error });
  }
}; 