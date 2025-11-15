import { Request, Response } from 'express';
import Order from '@models/Order';

// GET /orders/get-orders/ - Get all !isDelete Orders
export const getOrders = async (req: Request, res: Response) => {
    try{
        const orders = await Order.find({ isDeleted: false }).populate('vehicle').populate('customer').lean();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};