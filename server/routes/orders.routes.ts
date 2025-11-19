import express from 'express';
import requireAuth from '@middleware/requireAuth';
import { createOrder, deleteOrder, downloadInvoice, getOrder, getOrders, updateOrder } from '@controllers/orders.controller';

const router = express.Router();

// Protect all vehicle routes
router.use(requireAuth);

// GET /orders/get-orders - Add new order
router.get('/get-orders', getOrders);

// GET /orders/get-order - Add new order
router.get('/get-order/:_id', getOrder);

router.get('/download-invoice/:_id', downloadInvoice);

// POST /orders/create-order - Create new order
router.post('/create-order', createOrder);

// PUT /orders/update-order - Update existing order
router.put('/update-order', updateOrder);

// DELETE /orders/delete-order/:_id - Soft delete order
router.delete('/delete-order/:_id', deleteOrder);

export default router;