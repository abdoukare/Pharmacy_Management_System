import Medicine from "../models/Medicine";
import Purchase from "../models/Purchase";
import Sale from "../models/Sale";

// daily report 
export const dailySales = async(req, res)=>{
	try{
		const {date} = req.query;
		const sales = await Sale.find({saleDate: new Date(date)});
		const totalSales = sales.reduce((sum, sale)=> sum + sale.totalPrice, 0);
		const totalQuantity = sales.reduce((sum, sale)=> sum + sale.quantity);
		res.json({totalSales, totalQuantity, sales});
	}catch(err){
		res.status(500).json({error: err.message});
	}
};

// low stock medicine report 

export const lowStockMedicines = async(req, res)=>{
	try{
		const medicine = await Medicine.find({quantity: {$lt: 10}});
		res.json(medicine);
	}catch(err){
		res.status(500).json({error: err.message});
	}
}