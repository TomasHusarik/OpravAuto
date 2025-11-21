import express from 'express';
import requireAuth from '@middleware/requireAuth';
import { getServiceItems } from '@controllers/items.controller';
import { authorizeRole } from '@middleware/authorizeRole';

const router = express.Router();

// Protect all vehicle routes
router.use(requireAuth);

// GET /items/get-service-items - Get all service items
router.get('/get-service-items', authorizeRole('technician'),  getServiceItems );

export default router;