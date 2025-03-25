import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    medicine: { type: String, required: true },
    batch: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    status: {
      type: String,
      default: "in stock",
      enum: ["in stock", "low stock", "expiring", "expired", "out of stock"],
    },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    purchaseDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

// Function to calculate status
medicineSchema.methods.calculateStatus = function() {
  const today = new Date();
  const expiryDate = new Date(this.expiryDate);
  const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));

  if (this.quantity <= 0) {
    return "out of stock";
  }
  if (today >= expiryDate) {
    return "expired";
  }
  if (daysUntilExpiry <= 90) {
    return "expiring";
  }
  if (this.quantity <= 500) {
    return "low stock";
  }
  return "in stock";
};

// Pre-save middleware
medicineSchema.pre('save', function(next) {
  this.status = this.calculateStatus();
  next();
});

// Pre-update middleware
medicineSchema.pre(['updateOne', 'findOneAndUpdate'], async function(next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  if (docToUpdate) {
    const status = docToUpdate.calculateStatus();
    this.set({ status });
  }
  next();
});

//module.exports = mongoose.model('Medicine', medicineSchema);
const Medicine = mongoose.model('Medicine', medicineSchema);
export default Medicine;