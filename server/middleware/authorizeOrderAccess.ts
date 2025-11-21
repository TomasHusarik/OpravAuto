// middleware/authorizeOrderAccess.ts
import { Request, Response, NextFunction } from 'express';
import { AuthPayload } from './requireAuth';

export const authorizeOrderAccess = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as AuthPayload | undefined;

  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  if (user.role === 'technician') {
    return next();
  }

  if (user.role === 'customer') {
    const requestedId =
      req.params._id || (req.query._id as string) || (req.body && (req.body._id as string));

    if (!requestedId) {
      return res.status(400).json({ error: 'Order ID is required' });
    }

    if (user.orderId !== requestedId.toString()) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    return next();
  }

  return res.status(403).json({ error: 'Forbidden' });
};
