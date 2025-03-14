# SashBid

A comprehensive application for managing bids and projects for a Door & Window company. Built with Next.js, Node.js, Express, and MongoDB.

## Features

- **Project Management**: Create and track different bidding projects
- **Inventory Management**: Catalog doors, windows, and related products
- **Cost Calculation**: Calculate material and labor costs
- **Bid Generation**: Create professional-looking bid documents
- **Client Management**: Store client information and communication history
- **Mobile Access**: Access the app in the field when meeting clients
- **User Authentication**: Role-based access control (Admin, Manager, User)
- **Real-time Updates**: Stay synchronized with the latest project changes

## Tech Stack

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Chart.js for data visualization
- React Hook Form for form handling

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Morgan for HTTP request logging

## Prerequisites

- Node.js (v18 or later)
- npm or yarn
- MongoDB (v6 or later)
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/SashBid.git
cd SashBid
```

2. Install dependencies for both frontend and backend:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables:

Frontend (.env.local):
```env
NEXT_PUBLIC_API_URL=http://localhost:5002
```

Backend (.env):
```env
NODE_ENV=development
PORT=5002
MONGODB_URI=mongodb://localhost:27017/sashbid
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRES_IN=7d
```

4. Start MongoDB:
```bash
# On macOS with Homebrew
brew services start mongodb/brew/mongodb-community
```

5. Seed the database with initial data:
```bash
cd backend
npx ts-node src/scripts/seed-data.ts
```

6. Start the development servers:

In one terminal:
```bash
cd backend
npm run dev
```

In another terminal:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5002

## Default User Accounts

The seed script creates three default user accounts:

1. Admin User:
   - Email: admin@sashbid.com
   - Password: password123

2. Manager User:
   - Email: manager@sashbid.com
   - Password: password123

3. Regular User:
   - Email: user@sashbid.com
   - Password: password123

## Development Scripts

### Frontend
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

### Backend
- `npm run dev`: Start development server with hot reload
- `npm run build`: Build TypeScript files
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run test`: Run tests

## Project Structure

```
SashBid/
├── frontend/
│   ├── app/                 # Next.js app directory
│   ├── components/          # Reusable React components
│   ├── contexts/           # React contexts
│   ├── public/             # Static assets
│   └── styles/             # Global styles
├── backend/
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   ├── scripts/        # Utility scripts
│   │   └── server.ts       # Main server file
│   └── tests/              # Test files
└── README.md
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Issues**
   - Ensure MongoDB is running: `brew services list`
   - Check MongoDB connection string in backend/.env
   - Verify MongoDB is listening on port 27017

2. **Port Conflicts**
   - If port 3000 is in use, Next.js will automatically use port 3001
   - If port 5002 is in use, modify the PORT in backend/.env

3. **Authentication Issues**
   - Clear browser localStorage
   - Ensure backend server is running
   - Check browser console for API errors

4. **Build Errors**
   - Clear node_modules and reinstall dependencies
   - Ensure TypeScript is properly configured
   - Check for missing environment variables

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Development Credits

Developed with ❤️ by [Waxie](https://github.com/waxie)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
