import express from 'express';
import requireAuth from '@middleware/requireAuth';
import { getNewId } from '@controllers/helpers.controller';

const router = express.Router();

// Protect all vehicle routes
router.use(requireAuth);

// GET /helpers/get-id- Get new MongoDB ID
router.get('/get-id', getNewId);

export default router;