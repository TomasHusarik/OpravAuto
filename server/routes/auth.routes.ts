import express from 'express';
import { login, signUp, verifyAccessCode } from '@controllers/auth.controller';
import { updateProfile } from '@controllers/technicians.controller';
import requireAuth from '@middleware/requireAuth';

const router = express.Router();

// POST /auth/login - Technician login
router.post('/login', login);

// POST /auth/login - Technician login
router.post('/sign-up', signUp);

// POST /auth/verify-access-code - Verify customer access code
router.post('/verify-access-code', verifyAccessCode);

// PUT /auth/update - update current user's profile (protected)
router.put('/update', requireAuth, updateProfile);

export default router;