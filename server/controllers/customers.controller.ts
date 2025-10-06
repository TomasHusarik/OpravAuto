import { Request, Response } from 'express';
import Customer from '@models/Customer';

export const addCusotmer = async (req: Request, res: Response) => {
    const { firstName, lastName, email, phoneNumber, address } = req.body;

    try {
        const newCustomer = new Customer({
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
        });
        await newCustomer.save();
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// GET /customers/get-customers/ - Get all customers
export const getCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};