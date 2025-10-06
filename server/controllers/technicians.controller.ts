import e, { Request, Response } from 'express';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import validator from 'validator';
import env from '@utils/validateEnv';

import Technician from '@models/Technician';
import ErrorMessages from '@utils/errorMessages';
import mongoose, { ObjectId } from 'mongoose';


/**
 *  Auth section
 */

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