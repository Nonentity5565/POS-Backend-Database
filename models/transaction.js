const mongoose = require('mongoose');
const { pos_db } = require('../database/database');

const orderObj = new mongoose.Schema({
	foodName: { type: String, required: true },
	qty: { type: Number, required: true },
	price: { type: Number, required: true },
});

const transactionSchema = new mongoose.Schema(
	{
		orderNumber: { type: Number, required: true },
		date: { type: Date, default: Date.now },
		having: { type: String, required: true },
		paidBy: { type: String, required: true },
		total: { type: Number, required: true },
		order: [orderObj],
	},
	{ collection: 'transactions' }
);

const TransactionModel = pos_db.model('TransactionModel', transactionSchema);

module.exports = TransactionModel;
