import { Request, Response } from 'express';
import Customer from '@models/Customer';

export const addCustomer = async (req: Request, res: Response) => {
    const { firstName, lastName, email, phoneNumber, address, note } = req.body;

    try {
        const newCustomer = new Customer({ firstName, lastName, email, phoneNumber, address, note });
        await newCustomer.save();
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// GET /customers/get-customers/ - Get all !isDelete customers
export const getCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await Customer.find({isDeleted: false });
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// PUT /customers/update-customer - Update customer
export const updateCustomer = async (req: Request, res: Response) => {
    const { _id, ...updatedData } = req.body;

    try {
        const customer = await Customer.findById(_id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        Object.assign(customer, updatedData);

        await customer.save();

        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// DELETE /customers/delete-customer/:id - Soft delete customer
export const deleteCustomer = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const customer = await Customer.findById(id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        customer.isDeleted = true;
        await customer.save();

        res.status(200).json({ message: 'Customer soft deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};