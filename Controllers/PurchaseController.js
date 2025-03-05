import Purchase from "../models/Purchase.js";
import Medicine from "../models/Medicine.js";

// Record a purchase 

export const recordpurchase = async (req, res) =>{
	try{
		const {medId, quantity, totalPrice, purchaseDate} = req.body;

		// validate required fields
		if(!medId || !quantity || !totalPrice){
			return res.status(400).json({error: 'missing required fields'});
		}

		// find the medicine
		const medicine = await Medicine.findById(medId);
		if(!medId){
			return res.status(404).json({error:'medicine not found'});
		}
		// ubdating the medicine quantity 
		medicine.quantity += quantity;
		await medicine.save();

		// Recording the purchase 
		const purchase = new Purchase({medId, quantity, totalPrice, purchaseDate});
		await purchase.save()
		res.status(201).json(purchase);
	}
	catch(error){
		res.status(500).json({err: error.message});
	}
};
// Fetch all purchases
export const getPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find().populate('medId');// maybe the fault is here 
        res.json(purchases);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};