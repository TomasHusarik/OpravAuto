import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { generateCustomerEmail } from '@utils/generateCustomerEmail';


// GET /helpers/get-id - Get new MongoDB ID
export const getNewId = async (req: Request, res: Response) => {
    try {
        const newId = new mongoose.Types.ObjectId();
        res.status(200).json({ newId });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

export const sendCustomerEmail = async (req: Request, res: Response) => {
    try {
        generateCustomerEmail(req.body);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}
