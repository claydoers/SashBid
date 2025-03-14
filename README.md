# SashBid

A comprehensive application for managing bids and projects for a Door & Window company.

## Project Structure

This project is organized as a monorepo with two main components:

- **Frontend**: A Next.js application with React and Tailwind CSS
- **Backend**: A Node.js API with Express and MongoDB

## Features

- Project Management: Create and track different bidding projects
- Inventory Management: Catalog doors, windows, and related products
- Cost Calculation: Calculate material and labor costs
- Bid Generation: Create professional-looking bid documents
- Client Management: Store client information and communication history
- Mobile Access: Access the app in the field when meeting clients

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB

### Installation

1. Clone this repository
2. Install dependencies for both frontend and backend:

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables (see .env.example files in both directories)
4. Start the development servers:

```bash
# Start backend server
cd backend
npm run dev

# In a new terminal, start frontend server
cd frontend
npm run dev
```

## License

This project is licensed under the MIT License - see the LICENSE file for details. # SashBid
