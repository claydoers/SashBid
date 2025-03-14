import { Router } from 'express';
import {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
  addContactPerson,
  removeContactPerson,
} from '../controllers/client.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// All routes are protected
router.use(protect);

// Create a new client
router.post('/', createClient);

// Get all clients
router.get('/', getAllClients);

// Get client by ID
router.get('/:id', getClientById);

// Update client
router.put('/:id', updateClient);

// Delete client
router.delete('/:id', deleteClient);

// Add contact person to client
router.post('/:id/contacts', addContactPerson);

// Remove contact person from client
router.delete('/:id/contacts/:contactPersonId', removeContactPerson);

export default router; 