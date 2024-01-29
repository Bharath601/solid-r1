// index.js
import express from 'express';
import connectDB from './db/db.js';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
// Connect to Mo
connectDB();

// Routes
app.use('/', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

