# Window & Door Bidding Application - Backend

This is the backend API for the Window & Door Bidding Application, built with Node.js, Express, TypeScript, and MongoDB.

## Features

- User authentication and authorization
- Project management
- Bid creation and management
- Client management
- Inventory management
- RESTful API endpoints

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```
   cd window-door-bidding-app/backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```
4. Create a `.env` file in the root directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/window-door-bidding
   JWT_SECRET=your_jwt_secret_key_change_in_production
   JWT_EXPIRES_IN=7d
   ```

## Development

To start the development server:

```
npm run dev
```

or

```
yarn dev
```

The server will run on `http://localhost:5000` by default.

## Build

To build the application for production:

```
npm run build
```

or

```
yarn build
```

## Start Production Server

To start the production server:

```
npm start
```

or

```
yarn start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin only)
- `POST /api/users/change-password` - Change password

### Projects
- `POST /api/projects` - Create a new project
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Bids
- `POST /api/bids` - Create a new bid
- `GET /api/bids` - Get all bids
- `GET /api/bids/:id` - Get bid by ID
- `PUT /api/bids/:id` - Update bid
- `DELETE /api/bids/:id` - Delete bid
- `GET /api/bids/project/:projectId` - Get bids by project

### Clients
- `POST /api/clients` - Create a new client
- `GET /api/clients` - Get all clients
- `GET /api/clients/:id` - Get client by ID
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client
- `POST /api/clients/:id/contacts` - Add contact person to client
- `DELETE /api/clients/:id/contacts/:contactPersonId` - Remove contact person from client

### Inventory
- `POST /api/inventory` - Create a new inventory item
- `GET /api/inventory` - Get all inventory items
- `GET /api/inventory/:id` - Get inventory item by ID
- `PUT /api/inventory/:id` - Update inventory item
- `DELETE /api/inventory/:id` - Delete inventory item
- `PATCH /api/inventory/:id/quantity` - Update inventory quantity
- `GET /api/inventory/low-stock` - Get low stock items 