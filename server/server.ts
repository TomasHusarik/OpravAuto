import express from 'express';
import env from '@utils/validateEnv';
import cors from 'cors';
import { connectDB } from '@db/connection';

import vehicleRoutes from '@routes/vehicles.routes';
import technicianRoutes from '@routes/technicians.routes';


const PORT = env.PORT;
const app = express();

// CORS configuration
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.text());

// Routes
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/technicians', technicianRoutes);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});