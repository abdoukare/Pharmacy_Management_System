import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
	medicineId: {type:mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true},
	quantity: {type: Number, required: true},
	price: {type: Number, required:true},
	//date: {type: Date, required: true},
	purchaseDate: { type: Date, default: Date.now },
});
export default mongoose.model('Purchase', purchaseSchema);