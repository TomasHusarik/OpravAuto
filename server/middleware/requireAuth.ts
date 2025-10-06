import Technician from '@models/Technician';
import jwt from 'jsonwebtoken';

const requireAuth = async (req: any, res: any, next: any) => {

    // Verify authentication
    const { authorization } = req.headers;
    
    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1]; 

    try {
        const {_id} = jwt.verify(token, process.env.JWT_SECRET!) as { _id: string };

        req.user = await Technician.findById(_id).select('_id');
        next();
        
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(401).json({ error: 'Request is not authorized' });
    }
}
export default requireAuth;