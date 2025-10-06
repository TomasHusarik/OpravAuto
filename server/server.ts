import express from 'express';
import env from '@utils/validateEnv';
import { connectDB } from '@db/connection';
import cors from 'cors';

import vehicleRoutes from '@routes/vehicles.routes';
import authRoutes from '@routes/auth.routes';
import customerRoutes from '@routes/customers.routes';


const PORT = env.PORT;
const app = express();

// TODO: Refine CORS settings for production

// const corsOptions = {
//   origin: process.env.NODE_ENV === 'production' 
//     ? ['https://your-production-domain.com'] // Replace with your actual production domains
//     : ['http://localhost:3000', 'http://localhost:5173', 'http://10.0.0.15:5173'], // Development origins
//   credentials: true,
//   optionsSuccessStatus: 200,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
// };

app.use(cors());

// Middleware
app.use(express.json());
app.use(express.text());

// Routes
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});