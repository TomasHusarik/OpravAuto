// middleware/requireAuth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import env from '@utils/validateEnv';
import Technician from '@models/Technician';

interface TechnicianPayload {
  role: 'technician';
  technicianId: string;
}

interface CustomerPayload {
  role: 'customer';
  orderId: string;
  customerId: string;
}

export type AuthPayload = TechnicianPayload | CustomerPayload;

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
      technician?: any;
    }
  }
}

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as AuthPayload;
    req.user = decoded;

    if (decoded.role === 'technician') {
      const technician = await Technician.findById(decoded.technicianId).select(
        '_id email firstName lastName'
      );
      if (!technician) {
        return res.status(401).json({ error: 'Technician not found' });
      }
      req.technician = technician;
    }

    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ error: 'Request is not authorized' });
  }
};

export default requireAuth;