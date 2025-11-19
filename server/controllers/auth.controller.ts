import e, { Request, Response } from 'express';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import validator from 'validator';
import env from '@utils/validateEnv';

import Technician from '@models/Technician';
import ErrorMessages from '@utils/errorMessages';
import mongoose, { ObjectId } from 'mongoose';

const createToken = (_id: mongoose.Types.ObjectId) => {
    return jwt.sign(
        { _id },
        env.JWT_SECRET,
        { expiresIn: '24h' }
    );
}

// POST /technicians/login - Technician login
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Input validation
        if (!email || !password) {
            return res.status(400).json({ error: ErrorMessages.emailPasswordRequired });
        }

        // Find technician and explicitly select password field
        const technician = await Technician.findOne({ email }).select('+password');
        if (!technician) {
            return res.status(401).json({ error: ErrorMessages.invalidCredentials });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, technician.password);
        if (!isMatch) {
            return res.status(401).json({ error: ErrorMessages.invalidCredentials });
        }

        // Generate token
        const token = createToken(technician._id);

        // Remove password from response
        const { password: _, ...technicianData } = technician.toObject();

        return res.status(200).json({ technician: technicianData, token });
    } catch (error) {
        return res.status(500).json({ error: ErrorMessages.internalServerError });
    }
};

// POST /technicians/sign-up - Technician sign up
export const signUp = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
        return res.status(400).json({ error: ErrorMessages.emailPasswordRequired });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: ErrorMessages.invalidEmailFormat });
    }

    // if (!validator.isStrongPassword(password, { minSymbols: 6 })) {
    //     return res.status(400).json({ error: ErrorMessages.weakPassword });
    // }

    try {
        const technician = await Technician.findOne({ email });
        if (technician) {
            return res.status(400).json({ error: ErrorMessages.emailAlreadyInUse });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newTechnician = await Technician.create({ ...req.body, password: hash });

        // Generate token for the new technician
        const token = createToken(newTechnician._id);

        // Remove password from response
        const { password: _, ...technicianData } = newTechnician.toObject();

        return res.status(201).json({ technician: technicianData, token } );
    } catch (error) {
        return res.status(500).json({ error: ErrorMessages.internalServerError });
    }
};

// PUT /technicians/update - Update current technician profile (protected)
export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user?._id;
        if (!userId) return res.status(401).json({ error: ErrorMessages.unauthorized });

        const { firstName, lastName, email, phoneNumber, password } = req.body;

        // Basic validation
        if (email && !validator.isEmail(email)) {
            return res.status(400).json({ error: ErrorMessages.invalidEmailFormat });
        }

        // Find existing user
        const technician = await Technician.findById(userId).select('+password');
        if (!technician) return res.status(404).json({ error: 'Technician not found' });

        // If email changed, ensure it's not taken
        if (email && email !== technician.email) {
            const exists = await Technician.findOne({ email });
            if (exists) return res.status(400).json({ error: ErrorMessages.emailAlreadyInUse });
            technician.email = email;
        }

        // If phone changed, ensure it's not taken
        if (phoneNumber && phoneNumber !== technician.phoneNumber) {
            const exists = await Technician.findOne({ phoneNumber });
            if (exists) return res.status(400).json({ error: ErrorMessages.phoneAlreadyInUse });
            technician.phoneNumber = phoneNumber;
        }

        if (firstName) technician.firstName = firstName;
        if (lastName) technician.lastName = lastName;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            technician.password = hash;
        }

        await technician.save();

        // Generate new token
        const token = createToken(technician._id);

        const { password: _, ...technicianData } = technician.toObject();
        return res.status(200).json({ technician: technicianData, token });
    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ error: ErrorMessages.internalServerError });
    }
};