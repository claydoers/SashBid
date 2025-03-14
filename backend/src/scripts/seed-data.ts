import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User, { IUser } from '../models/user.model';
import Client, { IClient } from '../models/client.model';
import Project, { IProject } from '../models/project.model';
import Bid, { IBid } from '../models/bid.model';
import InventoryItem, { IInventoryItem } from '../models/inventory.model';

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sashbid');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Clear existing data
const clearData = async () => {
  try {
    await User.deleteMany({});
    await Client.deleteMany({});
    await Project.deleteMany({});
    await Bid.deleteMany({});
    await InventoryItem.deleteMany({});
    console.log('Data cleared successfully');
  } catch (error: any) {
    console.error(`Error clearing data: ${error.message}`);
    process.exit(1);
  }
};

// Seed users
const seedUsers = async (): Promise<IUser[]> => {
  try {
    const users = [
      {
        name: 'Admin User',
        email: 'admin@sashbid.com',
        password: 'password123',
        role: 'admin',
        company: 'SashBid Windows & Doors',
        phone: '555-123-4567',
      },
      {
        name: 'Manager User',
        email: 'manager@sashbid.com',
        password: 'password123',
        role: 'manager',
        company: 'SashBid Windows & Doors',
        phone: '555-234-5678',
      },
      {
        name: 'Regular User',
        email: 'user@sashbid.com',
        password: 'password123',
        role: 'user',
        company: 'SashBid Windows & Doors',
        phone: '555-345-6789',
      },
    ];

    const createdUsers = await User.create(users);
    console.log(`${createdUsers.length} users created`);
    return createdUsers;
  } catch (error: any) {
    console.error(`Error seeding users: ${error.message}`);
    process.exit(1);
  }
};

// Seed clients
const seedClients = async (adminUser: IUser): Promise<IClient[]> => {
  try {
    const clients = [
      {
        name: 'Acme Construction',
        email: 'info@acmeconstruction.com',
        phone: '555-111-2222',
        address: {
          street: '123 Builder Ave',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94105',
          country: 'USA',
        },
        contactPersons: [
          {
            name: 'John Builder',
            position: 'Project Manager',
            email: 'john@acmeconstruction.com',
            phone: '555-111-3333',
          },
          {
            name: 'Sarah Architect',
            position: 'Lead Architect',
            email: 'sarah@acmeconstruction.com',
            phone: '555-111-4444',
          },
        ],
        notes: 'Major commercial client, focus on high-end projects',
        createdBy: adminUser._id,
      },
      {
        name: 'Luxury Homes Inc',
        email: 'contact@luxuryhomes.com',
        phone: '555-222-3333',
        address: {
          street: '456 Mansion Blvd',
          city: 'Beverly Hills',
          state: 'CA',
          zipCode: '90210',
          country: 'USA',
        },
        contactPersons: [
          {
            name: 'Michael Luxury',
            position: 'CEO',
            email: 'michael@luxuryhomes.com',
            phone: '555-222-4444',
          },
        ],
        notes: 'High-end residential developer, prefers custom solutions',
        createdBy: adminUser._id,
      },
      {
        name: 'Modern Renovations',
        email: 'hello@modernrenovations.com',
        phone: '555-333-4444',
        address: {
          street: '789 Update Lane',
          city: 'Seattle',
          state: 'WA',
          zipCode: '98101',
          country: 'USA',
        },
        contactPersons: [
          {
            name: 'Jessica Modern',
            position: 'Operations Manager',
            email: 'jessica@modernrenovations.com',
            phone: '555-333-5555',
          },
          {
            name: 'David Renovator',
            position: 'Field Supervisor',
            email: 'david@modernrenovations.com',
            phone: '555-333-6666',
          },
        ],
        notes: 'Specializes in updating older homes with modern fixtures',
        createdBy: adminUser._id,
      },
      {
        name: 'Commercial Builders LLC',
        email: 'projects@commercialbuilders.com',
        phone: '555-444-5555',
        address: {
          street: '101 Office Park',
          city: 'Chicago',
          state: 'IL',
          zipCode: '60601',
          country: 'USA',
        },
        contactPersons: [
          {
            name: 'Robert Commercial',
            position: 'Procurement Manager',
            email: 'robert@commercialbuilders.com',
            phone: '555-444-6666',
          },
        ],
        notes: 'Large commercial projects, government contracts',
        createdBy: adminUser._id,
      },
      {
        name: 'Sustainable Living Spaces',
        email: 'green@sustainableliving.com',
        phone: '555-555-6666',
        address: {
          street: '202 Eco Drive',
          city: 'Portland',
          state: 'OR',
          zipCode: '97201',
          country: 'USA',
        },
        contactPersons: [
          {
            name: 'Emma Green',
            position: 'Sustainability Director',
            email: 'emma@sustainableliving.com',
            phone: '555-555-7777',
          },
          {
            name: 'Oliver Eco',
            position: 'Project Coordinator',
            email: 'oliver@sustainableliving.com',
            phone: '555-555-8888',
          },
        ],
        notes: 'Focus on eco-friendly materials and energy efficiency',
        createdBy: adminUser._id,
      },
    ];

    const createdClients = await Client.create(clients);
    console.log(`${createdClients.length} clients created`);
    return createdClients;
  } catch (error: any) {
    console.error(`Error seeding clients: ${error.message}`);
    process.exit(1);
  }
};

// Seed inventory items
const seedInventory = async (adminUser: IUser): Promise<IInventoryItem[]> => {
  try {
    const inventoryItems = [
      {
        name: 'Premium Vinyl Window',
        type: 'window',
        description: 'Double-hung vinyl window with energy-efficient glass',
        sku: 'WIN-001',
        dimensions: {
          width: 36,
          height: 60,
          unit: 'in',
        },
        manufacturer: 'WindowCraft',
        price: 299.99,
        cost: 175.50,
        quantity: 25,
        minQuantity: 5,
        location: 'Warehouse A',
        category: 'Vinyl Windows',
        tags: ['energy-efficient', 'double-hung', 'vinyl'],
        notes: 'Best-selling window model',
        createdBy: adminUser._id,
      },
      {
        name: 'Fiberglass Entry Door',
        type: 'door',
        description: 'Insulated fiberglass entry door with decorative glass insert',
        sku: 'DOOR-101',
        dimensions: {
          width: 36,
          height: 80,
          depth: 1.75,
          unit: 'in',
        },
        manufacturer: 'DoorMaster',
        price: 849.99,
        cost: 550.00,
        quantity: 12,
        minQuantity: 3,
        location: 'Warehouse B',
        category: 'Entry Doors',
        tags: ['fiberglass', 'entry', 'decorative-glass'],
        notes: 'Popular for high-end homes',
        createdBy: adminUser._id,
      },
      {
        name: 'Sliding Patio Door',
        type: 'door',
        description: 'Aluminum sliding patio door with tempered glass',
        sku: 'DOOR-202',
        dimensions: {
          width: 72,
          height: 80,
          unit: 'in',
        },
        manufacturer: 'GlassCraft',
        price: 1299.99,
        cost: 850.00,
        quantity: 8,
        minQuantity: 2,
        location: 'Warehouse A',
        category: 'Patio Doors',
        tags: ['sliding', 'aluminum', 'patio'],
        notes: 'Smooth operation, good for modern homes',
        createdBy: adminUser._id,
      },
      {
        name: 'Door Handle Set',
        type: 'hardware',
        description: 'Brushed nickel handle set with deadbolt',
        sku: 'HW-501',
        manufacturer: 'LockSafe',
        price: 89.99,
        cost: 45.00,
        quantity: 50,
        minQuantity: 10,
        location: 'Shelf C3',
        category: 'Door Hardware',
        tags: ['handle', 'nickel', 'deadbolt'],
        notes: 'Compatible with most standard doors',
        createdBy: adminUser._id,
      },
      {
        name: 'Window Weatherstripping',
        type: 'material',
        description: 'Self-adhesive foam weatherstripping for windows',
        sku: 'MAT-301',
        price: 12.99,
        cost: 5.50,
        quantity: 100,
        minQuantity: 20,
        location: 'Shelf D2',
        category: 'Weather Sealing',
        tags: ['weatherstripping', 'foam', 'insulation'],
        notes: 'Sold by the roll (10 feet)',
        createdBy: adminUser._id,
      },
      {
        name: 'Bay Window Unit',
        type: 'window',
        description: 'Pre-assembled bay window with three panels',
        sku: 'WIN-105',
        dimensions: {
          width: 84,
          height: 60,
          depth: 24,
          unit: 'in',
        },
        manufacturer: 'WindowCraft',
        price: 1899.99,
        cost: 1200.00,
        quantity: 4,
        minQuantity: 1,
        location: 'Warehouse C',
        category: 'Specialty Windows',
        tags: ['bay', 'pre-assembled', 'multi-panel'],
        notes: 'Requires special handling and installation',
        createdBy: adminUser._id,
      },
      {
        name: 'French Door Set',
        type: 'door',
        description: 'Double french doors with clear glass panels',
        sku: 'DOOR-303',
        dimensions: {
          width: 60,
          height: 80,
          unit: 'in',
        },
        manufacturer: 'DoorMaster',
        price: 1599.99,
        cost: 950.00,
        quantity: 6,
        minQuantity: 2,
        location: 'Warehouse B',
        category: 'French Doors',
        tags: ['french', 'double', 'glass-panel'],
        notes: 'Includes both door panels and frame',
        createdBy: adminUser._id,
      },
    ];

    const createdInventory = await InventoryItem.create(inventoryItems);
    console.log(`${createdInventory.length} inventory items created`);
    return createdInventory;
  } catch (error: any) {
    console.error(`Error seeding inventory: ${error.message}`);
    process.exit(1);
  }
};

// Seed projects
const seedProjects = async (clients: IClient[], adminUser: IUser): Promise<IProject[]> => {
  try {
    const projects = [
      {
        name: 'Acme HQ Renovation',
        description: 'Complete window and door replacement for Acme Construction headquarters',
        client: clients[0]._id,
        status: 'in_progress',
        startDate: new Date('2023-06-01'),
        endDate: new Date('2023-09-30'),
        value: 75000,
        notes: 'Phase 1 of 3, focusing on main building',
        createdBy: adminUser._id,
      },
      {
        name: 'Luxury Homes Beverly Hills Estate',
        description: 'Custom windows and doors for new luxury estate construction',
        client: clients[1]._id,
        status: 'pending',
        startDate: new Date('2023-08-15'),
        value: 120000,
        notes: 'Client requested premium materials throughout',
        createdBy: adminUser._id,
      },
      {
        name: 'Modern Renovations Seattle Office',
        description: 'Energy-efficient window upgrade for downtown office',
        client: clients[2]._id,
        status: 'completed',
        startDate: new Date('2023-02-10'),
        endDate: new Date('2023-04-15'),
        value: 45000,
        notes: 'Completed ahead of schedule, client very satisfied',
        createdBy: adminUser._id,
      },
      {
        name: 'Commercial Builders Chicago Tower',
        description: 'High-rise window installation for new office tower',
        client: clients[3]._id,
        status: 'in_progress',
        startDate: new Date('2023-05-01'),
        endDate: new Date('2024-02-28'),
        value: 350000,
        notes: 'Large-scale project, requires specialized installation team',
        createdBy: adminUser._id,
      },
      {
        name: 'Sustainable Living Eco Homes',
        description: 'Energy-efficient doors and windows for eco-friendly housing development',
        client: clients[4]._id,
        status: 'pending',
        value: 95000,
        notes: 'Using only sustainable materials, LEED certification required',
        createdBy: adminUser._id,
      },
    ];

    const createdProjects = await Project.create(projects);
    console.log(`${createdProjects.length} projects created`);
    return createdProjects;
  } catch (error: any) {
    console.error(`Error seeding projects: ${error.message}`);
    process.exit(1);
  }
};

// Seed bids
const seedBids = async (projects: IProject[], clients: IClient[], adminUser: IUser): Promise<IBid[]> => {
  try {
    const bids = [
      {
        project: projects[0]._id,
        client: clients[0]._id,
        items: [
          {
            description: 'Premium Vinyl Windows (36"x60")',
            quantity: 45,
            unitPrice: 299.99,
            total: 13499.55,
          },
          {
            description: 'Fiberglass Entry Doors',
            quantity: 12,
            unitPrice: 849.99,
            total: 10199.88,
          },
          {
            description: 'Installation Labor',
            quantity: 120,
            unitPrice: 85,
            total: 10200,
          },
        ],
        subtotal: 33899.43,
        tax: 2711.95,
        total: 36611.38,
        status: 'accepted',
        dueDate: new Date('2023-05-15'),
        notes: 'First phase of headquarters renovation',
        createdBy: adminUser._id,
      },
      {
        project: projects[1]._id,
        client: clients[1]._id,
        items: [
          {
            description: 'Custom Bay Windows',
            quantity: 8,
            unitPrice: 1899.99,
            total: 15199.92,
          },
          {
            description: 'French Door Sets',
            quantity: 6,
            unitPrice: 1599.99,
            total: 9599.94,
          },
          {
            description: 'Premium Door Hardware',
            quantity: 12,
            unitPrice: 89.99,
            total: 1079.88,
          },
          {
            description: 'Installation and Finishing',
            quantity: 1,
            unitPrice: 22500,
            total: 22500,
          },
        ],
        subtotal: 48379.74,
        tax: 3870.38,
        total: 52250.12,
        status: 'sent',
        dueDate: new Date('2023-08-01'),
        notes: 'Awaiting client approval, premium package offered',
        createdBy: adminUser._id,
      },
      {
        project: projects[2]._id,
        client: clients[2]._id,
        items: [
          {
            description: 'Energy-Efficient Office Windows',
            quantity: 32,
            unitPrice: 349.99,
            total: 11199.68,
          },
          {
            description: 'Installation Services',
            quantity: 64,
            unitPrice: 75,
            total: 4800,
          },
          {
            description: 'Weatherproofing Materials',
            quantity: 1,
            unitPrice: 1200,
            total: 1200,
          },
        ],
        subtotal: 17199.68,
        tax: 1375.97,
        total: 18575.65,
        status: 'accepted',
        dueDate: new Date('2023-01-30'),
        notes: 'Completed project, final payment received',
        createdBy: adminUser._id,
      },
      {
        project: projects[3]._id,
        client: clients[3]._id,
        items: [
          {
            description: 'Commercial-Grade Windows',
            quantity: 420,
            unitPrice: 499.99,
            total: 209995.80,
          },
          {
            description: 'Commercial Entry Doors',
            quantity: 24,
            unitPrice: 1299.99,
            total: 31199.76,
          },
          {
            description: 'Specialized Installation',
            quantity: 1,
            unitPrice: 85000,
            total: 85000,
          },
        ],
        subtotal: 326195.56,
        tax: 26095.64,
        total: 352291.20,
        status: 'accepted',
        dueDate: new Date('2023-04-15'),
        notes: 'Large project, payment schedule established',
        createdBy: adminUser._id,
      },
      {
        project: projects[4]._id,
        client: clients[4]._id,
        items: [
          {
            description: 'Energy Star Windows',
            quantity: 64,
            unitPrice: 399.99,
            total: 25599.36,
          },
          {
            description: 'Eco-Friendly Entry Doors',
            quantity: 16,
            unitPrice: 949.99,
            total: 15199.84,
          },
          {
            description: 'Sustainable Materials Package',
            quantity: 1,
            unitPrice: 8500,
            total: 8500,
          },
          {
            description: 'Green Certification Consulting',
            quantity: 1,
            unitPrice: 3500,
            total: 3500,
          },
        ],
        subtotal: 52799.20,
        tax: 4223.94,
        total: 57023.14,
        status: 'draft',
        dueDate: new Date('2023-09-01'),
        notes: 'Draft bid for eco-housing development',
        createdBy: adminUser._id,
      },
    ];

    const createdBids = await Bid.create(bids);
    console.log(`${createdBids.length} bids created`);
    return createdBids;
  } catch (error: any) {
    console.error(`Error seeding bids: ${error.message}`);
    process.exit(1);
  }
};

// Main seed function
const seedDatabase = async () => {
  try {
    const conn = await connectDB();
    
    // Clear existing data
    await clearData();
    
    // Seed data
    const users = await seedUsers();
    const adminUser = users[0]; // Use the admin user as the creator
    
    const clients = await seedClients(adminUser);
    const inventory = await seedInventory(adminUser);
    const projects = await seedProjects(clients, adminUser);
    const bids = await seedBids(projects, clients, adminUser);
    
    console.log('Database seeded successfully!');
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
    
    process.exit(0);
  } catch (error: any) {
    console.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase(); 