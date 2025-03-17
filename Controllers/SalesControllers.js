import Medicine from '../models/Medicine.js';
import Sales from '../models/Sales.js';

// Record a sale 
export const recordSale = async (req, res) => {
    try {
        const { medicineId, quantity, totalPrice } = req.body;

		// Validate required fields
        if (!medicineId || !quantity || !totalPrice) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        // find the medicine 
        const medicine = await Medicine.findById(medicineId);
        if (!medicine) {
            return res.status(404).json({ error: 'Medicine not found' });
        }

        // Check if there's enough stock
        if (medicine.quantity < quantity) {
            return res.status(400).json({ error: 'Not enough stock' });
        }

        // Update the medicine quantity 
        medicine.quantity -= quantity;
        await medicine.save();

         // Record the sale 
		 const sale = new Sales({ 
            medicineId,  // Changed from medId to medicineId
            quantity, 
            totalPrice,
            date: new Date() // Added required date field
        });
        await sale.save();
        res.status(201).json(sale);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// fetching all sales 
export const getSales = async (req, res) => {
    try {
        const sales = await Sales.find().populate('medId');
        res.json(sales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
