import express from 'express';
import requireAuth from '@middleware/requireAuth';
import { getOrders } from '@controllers/orders.controller';

const router = express.Router();

// Protect all vehicle routes
router.use(requireAuth);

// POST /orders/get-orders - Add new order
router.get('/get-orders', getOrders);

export default router;