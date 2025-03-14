import { Request, Response } from 'express';
import Inventory from '../models/inventory.model';

// Create a new inventory item
export const createInventoryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      type,
      description,
      sku,
      dimensions,
      manufacturer,
      price,
      cost,
      quantity,
      minQuantity,
      location,
      category,
      tags,
      images,
      notes,
    } = req.body;
    
    // Add the current user as the creator
    const createdBy = (req as any).user.id;
    
    // Check if item with the same SKU already exists
    if (sku) {
      const existingItem = await Inventory.findOne({ sku });
      if (existingItem) {
        res.status(400).json({ message: 'Item with this SKU already exists' });
        return;
      }
    }
    
    const inventoryItem = new Inventory({
      name,
      type,
      description,
      sku,
      dimensions,
      manufacturer,
      price,
      cost,
      quantity,
      minQuantity,
      location,
      category,
      tags,
      images,
      notes,
      createdBy,
    });
    
    const savedItem = await inventoryItem.save();
    
    res.status(201).json({
      message: 'Inventory item created successfully',
      item: savedItem,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error creating inventory item',
      error: error.message,
    });
  }
};

// Get all inventory items
export const getAllInventoryItems = async (req: Request, res: Response): Promise<void> => {
  try {
    // Parse query parameters for filtering and searching
    const { type, category, manufacturer, search, minQuantity, maxPrice } = req.query;
    
    // Build filter object
    const filter: any = {};
    
    if (type) {
      filter.type = type;
    }
    
    if (category) {
      filter.category = category;
    }
    
    if (manufacturer) {
      filter.manufacturer = manufacturer;
    }
    
    // Quantity filtering
    if (minQuantity) {
      filter.quantity = { $gte: Number(minQuantity) };
    }
    
    // Price filtering
    if (maxPrice) {
      filter.price = { $lte: Number(maxPrice) };
    }
    
    // Text search
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
        { manufacturer: { $regex: search, $options: 'i' } },
      ];
    }
    
    // Get inventory items with populated creator data
    const items = await Inventory.find(filter)
      .populate('createdBy', 'name email')
      .sort({ name: 1 });
    
    res.status(200).json({
      count: items.length,
      items,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error fetching inventory items',
      error: error.message,
    });
  }
};

// Get inventory item by ID
export const getInventoryItemById = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Inventory.findById(req.params.id)
      .populate('createdBy', 'name email');
    
    if (!item) {
      res.status(404).json({ message: 'Inventory item not found' });
      return;
    }
    
    res.status(200).json({ item });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error fetching inventory item',
      error: error.message,
    });
  }
};

// Update inventory item
export const updateInventoryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      type,
      description,
      sku,
      dimensions,
      manufacturer,
      price,
      cost,
      quantity,
      minQuantity,
      location,
      category,
      tags,
      images,
      notes,
    } = req.body;
    
    // Check if item exists
    const item = await Inventory.findById(req.params.id);
    if (!item) {
      res.status(404).json({ message: 'Inventory item not found' });
      return;
    }
    
    // If SKU is being changed, check if it's already in use
    if (sku && sku !== item.sku) {
      const existingItem = await Inventory.findOne({ sku });
      if (existingItem) {
        res.status(400).json({ message: 'SKU already in use by another item' });
        return;
      }
    }
    
    // Update item
    const updatedItem = await Inventory.findByIdAndUpdate(
      req.params.id,
      {
        name,
        type,
        description,
        sku,
        dimensions,
        manufacturer,
        price,
        cost,
        quantity,
        minQuantity,
        location,
        category,
        tags,
        images,
        notes,
      },
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');
    
    res.status(200).json({
      message: 'Inventory item updated successfully',
      item: updatedItem,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error updating inventory item',
      error: error.message,
    });
  }
};

// Delete inventory item
export const deleteInventoryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if item exists
    const item = await Inventory.findById(req.params.id);
    if (!item) {
      res.status(404).json({ message: 'Inventory item not found' });
      return;
    }
    
    // Delete item
    await Inventory.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      message: 'Inventory item deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error deleting inventory item',
      error: error.message,
    });
  }
};

// Update inventory quantity
export const updateInventoryQuantity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { quantity, adjustment } = req.body;
    
    // Check if item exists
    const item = await Inventory.findById(req.params.id);
    if (!item) {
      res.status(404).json({ message: 'Inventory item not found' });
      return;
    }
    
    let newQuantity: number;
    
    // If quantity is provided, set it directly
    if (quantity !== undefined) {
      newQuantity = quantity;
    } 
    // If adjustment is provided, add/subtract from current quantity
    else if (adjustment !== undefined) {
      newQuantity = item.quantity + adjustment;
    } else {
      res.status(400).json({ message: 'Either quantity or adjustment must be provided' });
      return;
    }
    
    // Ensure quantity is not negative
    if (newQuantity < 0) {
      res.status(400).json({ message: 'Quantity cannot be negative' });
      return;
    }
    
    // Update quantity
    const updatedItem = await Inventory.findByIdAndUpdate(
      req.params.id,
      { quantity: newQuantity },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      message: 'Inventory quantity updated successfully',
      item: updatedItem,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error updating inventory quantity',
      error: error.message,
    });
  }
};

// Get low stock items
export const getLowStockItems = async (req: Request, res: Response): Promise<void> => {
  try {
    // Find items where quantity is less than or equal to minQuantity
    const items = await Inventory.find({
      $expr: { $lte: ['$quantity', '$minQuantity'] }
    }).populate('createdBy', 'name email');
    
    res.status(200).json({
      count: items.length,
      items,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error fetching low stock items',
      error: error.message,
    });
  }
}; 