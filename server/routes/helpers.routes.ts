import express from 'express';
import requireAuth from '@middleware/requireAuth';
import { getNewId } from '@controllers/helpers.controller';
import { authorizeRole } from '@middleware/authorizeRole';

const router = express.Router();

// Protect all vehicle routes
router.use(requireAuth);

// GET /helpers/get-id- Get new MongoDB ID
router.get('/get-id', authorizeRole('technician'), getNewId);

export default router;