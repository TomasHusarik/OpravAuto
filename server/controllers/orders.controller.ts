import { Request, Response } from 'express';
import Order from '@models/Order';


// GET /orders/get-order/:_id - Get order by ID
export const getOrder = async (req: Request, res: Response) => {
    try{
        const order = await Order.findOne({ _id: req.params._id, isDeleted: false })
            .populate('vehicle')
            .populate({ path: 'customer', populate: { path: 'vehicles', model: 'Vehicle' } })
            .lean({ virtuals: true });
        if(!order){
            return  res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

// GET /orders/get-orders/ - Get all !isDelete Orders
export const getOrders = async (req: Request, res: Response) => {
    try{
        const orders = await Order.find({ isDeleted: false }).populate('vehicle').populate('customer').lean();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};