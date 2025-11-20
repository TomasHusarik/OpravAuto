import e, { Request, Response } from 'express';
import Order from '@models/Order';
import { getPDFInvoice } from '@utils/generatePDF';
import bcrypt from "bcrypt";
import { generateAccessCode } from '@utils/helpers';
import { sendAccessCodeEmail } from '@utils/mailAccessCode';
import Customer from '@models/Customer';

// GET /orders/get-order/:_id - Get order by ID
export const getOrder = async (req: Request, res: Response) => {
    try {
        const order = await Order.findOne({ _id: req.params._id, isDeleted: false })
            .populate('vehicle')
            .populate({ path: 'customer', populate: { path: 'vehicles', model: 'Vehicle' } })
            .lean({ virtuals: true });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

// GET /orders/get-orders/ - Get all !isDelete Orders
export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({ isDeleted: false }).populate('vehicle').populate('customer').lean();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// POST /orders/create-order - Create new order
export const createOrder = async (req: Request, res: Response) => {
    try {

        const accessCode = generateAccessCode();

        //TODO: Hashing can be added later if needed
        // const salt = await bcrypt.genSalt(10);
        // const hash = await bcrypt.hash(accessCode, salt);

        const newOrder = await Order.create({ ...req.body, accessCode: accessCode });

        const customerEmail = await Customer.findById(req.body.customer).select('email').lean().then(c => c.email);

        if (customerEmail) {
            try {
                await sendAccessCodeEmail( customerEmail, newOrder._id.toString(), accessCode);

            } catch (mailError) {
                console.error('Error sending access code email:', mailError);
            }
        } else {
            console.warn('No customer email provided, cannot send access code.');
        }

        // Remove AccessCode from response
        const { accessCode: _, ...savedOrder } = newOrder.toObject();

        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

// PUT /orders/update-order - Update existing order
export const updateOrder = async (req: Request, res: Response) => {
    const { _id, ...updatedData } = req.body;

    try {
        const order = await Order.findById(_id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        Object.assign(order, updatedData);

        await order.save();

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// DELETE /orders/delete-order/:_id - Soft delete order
export const deleteOrder = async (req: Request, res: Response) => {
    const { _id } = req.params;

    try {
        const order = await Order.findById(_id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.isDeleted = true;
        await order.save();

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// GET /orders/download-invoice/:_id - Download invoice PDF
export const downloadInvoice = async (req: Request, res: Response) => {
    try {
        const order = await Order.findOne({ _id: req.params._id, isDeleted: false })
            .populate('vehicle')
            .populate('customer')

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        getPDFInvoice(order, res);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};