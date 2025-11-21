import express from 'express';
import { addVehicle, getVehicle, getVehicles, updateVehicle, deleteVehicle } from '@controllers/vehicles.controller';
import requireAuth from '@middleware/requireAuth';
import { authorizeRole } from '@middleware/authorizeRole';

const router = express.Router();

// Protect all vehicle routes
router.use(requireAuth);

// POST /vehicles/add-vehicle - Add new vehicle
router.post('/add-vehicle', authorizeRole('technician'), addVehicle);

// GET /vehicles/get-vehicle/:id - Get vehicle by ID parameter
router.get('/get-vehicle/:id', authorizeRole('technician'), getVehicle);

// GET /vehicles/get-vehicles/:ownerId - Get vehicle by Owner ID parameter
router.get('/get-vehicles/:ownerId', authorizeRole('technician'), getVehicles);

// PUT /vehicles/update-vehicle/:id - Update vehicle
router.put('/update-vehicle/:id', authorizeRole('technician'), updateVehicle);

// DELETE /vehicles/delete-vehicle/:id - Soft delete vehicle
router.delete('/delete-vehicle/:id', authorizeRole('technician'), deleteVehicle);

export default router;