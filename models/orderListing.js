const { kds_db } = require('../database/database');
const mongoose = require('mongoose');

const orderItemSchema = mongoose.Schema({
	foodName: { type: String, required: true },
	qty: { type: Number, required: true },
});

const orderListingSchema = new mongoose.Schema(
	{
		tableName: { type: String, required: true },
		time: { type: Date, default: Date.now },
		orders: { type: [orderItemSchema], required: true },
	},
	{ collection: 'orderListings' }
);

const OrderListingModel = kds_db.model('OrderListingModel', orderListingSchema);

module.exports = OrderListingModel;
