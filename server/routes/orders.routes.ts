import express from 'express';
import requireAuth from '@middleware/requireAuth';
import { authorizeOrderAccess } from '@middleware/authorizeOrderAccess';
import { authorizeRole } from '@middleware/authorizeRole';
import { createOrder, deleteOrder, downloadInvoice, getOrder, getOrders, updateOrder } from '@controllers/orders.controller';

const router = express.Router();

// Protect all vehicle routes
router.use(requireAuth);

/**
 * techician or customer with access
 */

// GET /orders/get-order - Get order detail (technician or customer with access)
router.get('/get-order/:_id', authorizeOrderAccess, getOrder);

// GET /orders/download-invoice - Download invoice (technician or customer with access)
router.get('/download-invoice/:_id', authorizeOrderAccess, downloadInvoice);

/**
 * Only technician
 */

// GET /orders/get-orders - Get all orders (technician only)
router.get('/get-orders', authorizeRole('technician'), getOrders);

// POST /orders/create-order - Create new order (technician only)
router.post('/create-order', authorizeRole('technician'), createOrder);

// PUT /orders/update-order - Update existing order (technician only)
router.put('/update-order', authorizeRole('technician'), updateOrder);

// DELETE /orders/delete-order/:_id - Soft delete order (technician only)
router.delete('/delete-order/:_id', authorizeRole('technician'), deleteOrder);

export default router;