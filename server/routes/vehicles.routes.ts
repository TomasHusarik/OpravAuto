import express from 'express';
import { addVehicle, getVehicle, getVehicles, updateVehicle, deleteVehicle } from '@controllers/vehicles.controller';
import requireAuth from '@middleware/requireAuth';

const router = express.Router();

// Protect all vehicle routes
router.use(requireAuth);

// POST /vehicles/add-vehicle - Add new vehicle
router.post('/add-vehicle', addVehicle);

// GET /vehicles/get-vehicle/:id - Get vehicle by ID parameter
router.get('/get-vehicle/:id', getVehicle);

// GET /vehicles/get-vehicles/:ownerId - Get vehicle by Owner ID parameter
router.get('/get-vehicles/:ownerId', getVehicles);

// PUT /vehicles/update-vehicle/:id - Update vehicle
router.put('/update-vehicle/:id', updateVehicle);

// DELETE /vehicles/delete-vehicle/:id - Soft delete vehicle
router.delete('/delete-vehicle/:id', deleteVehicle);

export default router;