import express from 'express';
import { connectDB } from '@db/connection';
import env from '@utils/validateEnv';

import vehicleRoutes from '@routes/vehicles.routes';


const PORT = env.PORT;
const app = express();

// Middleware
app.use(express.json());
app.use(express.text());

// Routes
app.use('/api/vehicles', vehicleRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});