import express from 'express';
import requireAuth from '@middleware/requireAuth';
import { addCusotmer, getCustomers, updateCustomer, deleteCustomer } from '@controllers/customers.controller';

const router = express.Router();

// Protect all vehicle routes
router.use(requireAuth);

// POST /customers/add-customer - Add new customer
router.post('/add-customer', addCusotmer);

// GET /customers/get-customers/ - Get all customers
router.get('/get-customers', getCustomers);

// PUT /customers/update-customer/:id - Update customer
router.put('/update-customer', updateCustomer);

// DELETE /customers/delete-customer/:id - Soft delete customer
router.delete('/delete-customer/:id', deleteCustomer);

export default router;