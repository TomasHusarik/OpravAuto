import { Request, Response } from 'express';
import Vehicle from '../models/Vehicle';

// POST /vehicles/add-vehicle - Add new vehicle
export const addVehicle = async (req: Request, res: Response) => {
    const { make, model, year, vin, color, mileage, engineType, transmission, owner, notes } = req.body;

    // Validate required fields
    if (!make || !model || !year || !vin || !owner) {
        return res.status(400).json({
            message: 'Missing required fields: make, model, year, vin, and owner are required'
        });
    }

    // Validate year
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear + 1) {
        return res.status(400).json({
            message: `Year must be between 1900 and ${currentYear + 1}`
        });
    }

    // Validate VIN length
    if (vin.length !== 17) {
        return res.status(400).json({
            message: 'VIN must be exactly 17 characters long'
        });
    }

    try {
        const newVehicle = new Vehicle({
            make,
            model,
            year,
            vin: vin.toUpperCase().trim(),
            color,
            mileage,
            engineType,
            transmission,
            owner,
            notes: notes || ""
        });

        await newVehicle.save();

        res.status(201).json({ message: 'Vehicle added successfully', vehicle: newVehicle });
    } catch (error: any) {
        console.error('Error adding vehicle:', error);
        
        // Handle specific MongoDB errors
        if (error.code === 11000) {
            return res.status(400).json({ 
                message: 'A vehicle with this VIN already exists' 
            });
        }
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                message: 'Validation error', 
                details: error.message 
            });
        }
        
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// GET /vehicles/get-vehicle/:id - Get vehicle by ID parameter
export const getVehicle = async (req: Request, res: Response) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        
        res.status(200).json(vehicle);
    } catch (error) {
        console.error('Error fetching vehicle:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// PUT /vehicles/update-vehicle/:id - Update vehicle
export const updateVehicle = async (req: Request, res: Response) => {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        
        res.status(200).json({ message: 'Vehicle updated successfully', vehicle });
    } catch (error) {
        console.error('Error updating vehicle:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// DELETE /vehicles/delete-vehicle/:id - Soft delete vehicle
export const deleteVehicle = async (req: Request, res: Response) => {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true },
            { new: true, runValidators: true }
        );
        
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        
        res.status(200).json({ 
            message: 'Vehicle deleted successfully', 
            vehicle 
        });
    } catch (error) {
        console.error('Error deleting vehicle:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};