import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
	name: {type: String, required: true},
	medId: {type: String, required: true, unique: true},
	category: {type: String, required: true},
	status: {type: String, default: 'in stock'},
	price: {type: Number, required: true},
	quantity: {type: Number, required: true},
	expiry: {type: Date, required: true},
});

//module.exports = mongoose.model('Medicine', medicineSchema);
const Medicine = mongoose.model('Medicine', medicineSchema);
export default Medicine;