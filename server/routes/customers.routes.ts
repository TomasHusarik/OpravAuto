import express from 'express';
import requireAuth from '@middleware/requireAuth';
import { addCustomer, getCustomers, getCustomer, updateCustomer, deleteCustomer } from '@controllers/customers.controller';
import { authorizeRole } from '@middleware/authorizeRole';

const router = express.Router();

// Protect all vehicle routes
router.use(requireAuth);

// POST /customers/add-customer - Add new customer
router.post('/add-customer', authorizeRole('technician'), addCustomer);

// GET /customers/get-customers/ - Get all customers
router.get('/get-customers', authorizeRole('technician'), getCustomers);

// GET /customers/get-customer/:id - Get customer by ID
router.get('/get-customer/:_id', authorizeRole('technician'), getCustomer);

// PUT /customers/update-customer/:id - Update customer
router.put('/update-customer', authorizeRole('technician'), updateCustomer);

// DELETE /customers/delete-customer/:id - Soft delete customer
router.delete('/delete-customer/:id', authorizeRole('technician'), deleteCustomer);

export default router;