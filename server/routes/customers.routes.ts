import express from 'express';
import requireAuth from '@middleware/requireAuth';
import { addCustomer, getCustomers, getCustomer, updateCustomer, deleteCustomer } from '@controllers/customers.controller';
import { get } from 'mongoose';

const router = express.Router();

// Protect all vehicle routes
router.use(requireAuth);

// POST /customers/add-customer - Add new customer
router.post('/add-customer', addCustomer);

// GET /customers/get-customers/ - Get all customers
router.get('/get-customers', getCustomers);

// GET /customers/get-customer/:id - Get customer by ID
router.get('/get-customer/:_id', getCustomer);

// PUT /customers/update-customer/:id - Update customer
router.put('/update-customer', updateCustomer);

// DELETE /customers/delete-customer/:id - Soft delete customer
router.delete('/delete-customer/:id', deleteCustomer);

export default router;