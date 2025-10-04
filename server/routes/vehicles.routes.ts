import express from 'express';
import { 
    addVehicle, 
    getVehicle, 
    updateVehicle, 
    deleteVehicle 
} from '@controllers/vehicles.controller';

const router = express.Router();

// POST /vehicles/add-vehicle - Add new vehicle
router.post('/add-vehicle', addVehicle);

// GET /vehicles/get-vehicle/:id - Get vehicle by ID parameter
router.get('/get-vehicle/:vehicleId', getVehicle);

// PUT /vehicles/update-vehicle/:id - Update vehicle
router.put('/update-vehicle/:id', updateVehicle);

// DELETE /vehicles/delete-vehicle/:id - Soft delete vehicle
router.delete('/delete-vehicle/:id', deleteVehicle);

export default router;