import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import validator from 'validator';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import Technician from '@models/Technician';
import ErrorMessages from '@utils/errorMessages';
import env from '@utils/validateEnv';

const createToken = (_id: mongoose.Types.ObjectId) => {
	return jwt.sign(
		{ _id },
		env.JWT_SECRET,
		{ expiresIn: '24h' }
	);
}

// PUT /technicians/update - Update current technician profile (protected)
export const updateProfile = async (req: Request, res: Response) => {
	try {
		const { _id, firstName, lastName, email, phoneNumber, password } = req.body;

		if (!_id) return res.status(401).json({ error: ErrorMessages.unauthorized });


		// Basic validation
		if (email && !validator.isEmail(email)) {
			return res.status(400).json({ error: ErrorMessages.invalidEmailFormat });
		}

		// Find existing user
		const technician = await Technician.findById(_id).select('+password');
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
