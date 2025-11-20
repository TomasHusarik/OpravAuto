import jwt from 'jsonwebtoken';
import Order from '@models/Order';

const requireCustomerAuth = async (req: any, res: any, next: any) => {
    // Verify customer authentication
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { customerId, orderId } = jwt.verify(token, process.env.JWT_SECRET!) as { customerId: string; orderId: string };

        // Verify that order exists and belongs to this customer
        const order = await Order.findById(orderId).populate('customer');
        
        if (!order || order.customer._id.toString() !== customerId) {
            return res.status(401).json({ error: 'Request is not authorized' });
        }

        req.user = {
            customerId,
            orderId,
            customer: order.customer,
        };
        
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(401).json({ error: 'Request is not authorized' });
    }
};

export default requireCustomerAuth;
