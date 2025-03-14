import mongoose, { Document, Schema } from 'mongoose';

interface Dimension {
  width: number;
  height: number;
  depth?: number;
  unit: 'in' | 'cm' | 'mm' | 'ft';
}

export interface IInventoryItem extends Document {
  name: string;
  type: 'door' | 'window' | 'hardware' | 'material' | 'other';
  description: string;
  sku: string;
  dimensions?: Dimension;
  manufacturer?: string;
  price: number;
  cost: number;
  quantity: number;
  minQuantity?: number;
  location?: string;
  category?: string;
  tags?: string[];
  images?: string[];
  notes?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const dimensionSchema = new Schema<Dimension>(
  {
    width: {
      type: Number,
      required: [true, 'Width is required'],
      min: [0, 'Width cannot be negative'],
    },
    height: {
      type: Number,
      required: [true, 'Height is required'],
      min: [0, 'Height cannot be negative'],
    },
    depth: {
      type: Number,
      min: [0, 'Depth cannot be negative'],
    },
    unit: {
      type: String,
      enum: ['in', 'cm', 'mm', 'ft'],
      default: 'in',
    },
  },
  { _id: false }
);

const inventoryItemSchema = new Schema<IInventoryItem>(
  {
    name: {
      type: String,
      required: [true, 'Item name is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['door', 'window', 'hardware', 'material', 'other'],
      required: [true, 'Item type is required'],
    },
    description: {
      type: String,
      required: [true, 'Item description is required'],
      trim: true,
    },
    sku: {
      type: String,
      required: [true, 'SKU is required'],
      unique: true,
      trim: true,
    },
    dimensions: {
      type: dimensionSchema,
    },
    manufacturer: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    cost: {
      type: Number,
      required: [true, 'Cost is required'],
      min: [0, 'Cost cannot be negative'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
      default: 0,
    },
    minQuantity: {
      type: Number,
      min: [0, 'Minimum quantity cannot be negative'],
      default: 0,
    },
    location: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    notes: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Created by is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Create index for faster searches
inventoryItemSchema.index({ name: 'text', description: 'text', sku: 'text', manufacturer: 'text' });

const InventoryItem = mongoose.model<IInventoryItem>('InventoryItem', inventoryItemSchema);

export default InventoryItem; 