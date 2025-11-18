import ServiceItem from '@models/ServiceItem';
import { Request, Response } from 'express';

// GET /items/get-service-items - Get all service items
export const getServiceItems = async (req: Request, res: Response) => {
    try {
        const serviceItems = await ServiceItem.find();
        res.status(200).json(serviceItems);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};  