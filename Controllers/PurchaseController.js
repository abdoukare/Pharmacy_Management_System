import Purchase from "../models/Purchase.js";
import Medicine from "../models/Medicine.js";

// Record a purchase 

export const recordpurchase = async (req, res) =>{
	try{
		const {medicineId, quantity, price, purchaseDate, category} = req.body;

		// validate required fields
		if(!medicineId || !quantity || !price || !category){
			return res.status(400).json({error: 'missing required fields'});
		}

		   // find the medicine
		   let medicine = await Medicine.findById(medicineId);
		   if (!medicine) {
			   // If medicine doesn't exist, create a new one
			   medicine = new Medicine({
				   _id: medicineId,
				   category,
				   quantity: 0,  // Will be updated below
				   price,
				   status: 'in stock'
			   });
		   }
		// ubdating the medicine quantity 
		medicine.quantity += quantity;
		await medicine.save();

		// Recording the purchase 
		const purchase = new Purchase({medicineId,
			 quantity,
			  price,
			   purchaseDate: purchaseDate || new Date()
			});
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