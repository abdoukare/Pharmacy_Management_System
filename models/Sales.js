import mongoose from "mongoose";
 const SalesSchema = new mongoose.Schema({
	medicineId: {type:mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true},
	quantity: {type: Number, required: true},
	totalPrice:{type: Number, required: true},
	date: {type: Date, required: true},
 });
export default mongoose.model('Sales', SalesSchema);
