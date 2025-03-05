import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import ejs from 'ejs';
import authRoutes from './routes/authRoutes.js';
import medicineRoutes from './routes/medicineRoutes.js';
import saleRoutes from './routes/SalesRoutes.js';
import purchaseRoutes from './routes/purchaseRoutes.js';
import Medicine from './models/Medicine.js';

// load environment variables
dotenv.config();

// creating express app
const app = express();

// middlewares
app.use(cors()); // to allow cross origin requests
app.use(express.json()); // parse json data

// connect to mongodb
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/purchases', purchaseRoutes);
app.get('/', (req, res) => {
    res.send('Wlcome to the Pharmacy Management System!');
});


// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});