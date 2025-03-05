import Medicine from "../models/Medicine";

// Add a new medicine

export const addMedicine = async (req, res) => {
    try {
        const { name, medId, price, quantity, expiry, category, status } = req.body;
        const medicine = new Medicine({ name, medId, price, quantity, expiry, category, status });
        await medicine.save();
        res.status(201).json({ message: 'Medicine added successfully', medicine });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// update a medicine
export const updateMedicine = async (req, res) => {
    try {
        const { name, medId, price, quantity, expiry, category, status } = req.body;
        const medicine = await Medicine.findByIdAndUpdate(
            req.params.id,
            { name, medId, price, quantity, expiry, category, status },
            { new: true }
        );
        res.json(medicine);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};