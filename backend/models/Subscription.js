import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  amount: {
    type: Number
  },
  type: {
    type: String,
    enum: ["income", "expense"]
  },
  category: {
    type: String,
    trim: true
  },
  date: {
    type: Date
  }
}, {
  timestamps: true
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
