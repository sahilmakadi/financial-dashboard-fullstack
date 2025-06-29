const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  id: Number,
  date: String,
  amount: Number,
  category: String,
  status: String,
  user_id: String,
  user_profile: String
});

module.exports = mongoose.model('Transaction', transactionSchema, 'transactionData');
