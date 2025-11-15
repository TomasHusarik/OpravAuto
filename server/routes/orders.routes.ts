import express from 'express';
import requireAuth from '@middleware/requireAuth';
import { getOrder, getOrders } from '@controllers/orders.controller';

const router = express.Router();

// Protect all vehicle routes
router.use(requireAuth);

// GET /orders/get-orders - Add new order
router.get('/get-orders', getOrders);

// GET /orders/get-order - Add new order
router.get('/get-order/:_id', getOrder);

export default router;