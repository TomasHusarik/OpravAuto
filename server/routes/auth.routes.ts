import express from 'express';
import { login, signUp } from '@controllers/auth.controller';

const router = express.Router();

// POST /technicians/login - Technician login
router.post('/login', login);

// POST /technicians/login - Technician login
router.post('/sign-up', signUp);

export default router;