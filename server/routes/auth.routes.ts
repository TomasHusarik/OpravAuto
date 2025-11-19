import express from 'express';
import { login, signUp, updateProfile } from '@controllers/auth.controller';
import requireAuth from '@middleware/requireAuth';

const router = express.Router();

// POST /technicians/login - Technician login
router.post('/login', login);

// POST /technicians/login - Technician login
router.post('/sign-up', signUp);

// PUT /auth/update - update current user's profile (protected)
router.put('/update', requireAuth, updateProfile);

export default router;