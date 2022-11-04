const mongoose = require('mongoose');
const { pos_db } = require('../database/database');

const orderItemSchema = mongoose.Schema({
	foodName: { type: String, required: true },
	qty: { type: Number, required: true },
	price: { type: Number, required: true },
});

const tableSchema = new mongoose.Schema(
	{
		tableName: { type: String, required: true, index: true, unique: true },
		orders: [orderItemSchema],
	},
	{ collection: 'tables' }
);

const TableModel = pos_db.model('TableModel', tableSchema);

module.exports = TableModel;
