import express from 'express';
import { connectDB } from './db/connection';
import env from './utils/validateEnv';

const PORT = env.PORT;
const app = express();

// Middleware
app.use(express.json());
app.use(express.text());

// Routes

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});