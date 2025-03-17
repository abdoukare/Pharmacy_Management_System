import Medicine from '../models/Medicine.js';
//import Purchase from '../models/Purchase.js';
import Sale from '../models/Sales.js';

// daily report 
export const getDailySales = async(req, res) => {
    try {
        const {date} = req.query;
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const sales = await Sale.find({
            saleDate: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        });
        const totalSales = sales.reduce((sum, sale) => sum + sale.totalPrice, 0);
        const totalQuantity = sales.reduce((sum, sale) => sum + sale.quantity, 0);
        const totalPurchase = sales.reduce((sum, sale) => sum + sale.purchasePrice, 0);
        
        res.json({
            totalSales,
            totalQuantity,
            totalPurchase,
            grossProfit: totalSales - totalPurchase,
            sales
        });
    } catch(err) {
        res.status(500).json({error: err.message});
    }
};

// low stock medicine report 

export const getLowStockMedicines = async(req, res)=>{
	try{
		const medicine = await Medicine.find({quantity: {$lt: 10}});
		res.json(medicine);
	}catch(err){
		res.status(500).json({error: err.message});
	}
}