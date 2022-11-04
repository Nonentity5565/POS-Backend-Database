const express = require('express');
const router = express.Router();
const NotificationModel = require('../models/notification');
const OrderListingModel = require('../models/orderListing');
const TableModel = require('../models/table');

router.post('/', async (req, res) => {
	console.log(`Order ${req.method} request called`);
	const body = req.body;

	const table = await TableModel.findById(body.tableId).catch((err) => {
		console.log('Query failed');
		res.status(500).json({ error: err });
	});

	if (!table) {
		console.log('Failed to find table');
		res.status(404).json({ error: 'Table not found' });
		return;
	}

	body.orders.map((item) => table.orders.push(item));

	const tableSave = await table.save().catch((err) => {
		console.log('Query failed');
		res.status(500).json({ error: err });
	});

	if (!tableSave) {
		return;
	}

	const orderListingQuery = await OrderListingModel.create({
		tableName: table.tableName,
		orders: body.orders,
	}).catch((err) => {
		console.log('Query failed');
		res.status(500).json({ error: err });
	});

	if (orderListingQuery) {
		res.status(200).json({ status: 'success' });
	}
});

router.delete('/', async (req, res) => {
	console.log(`Order ${req.method} request called`);
	const body = req.body;

	const queryResult = await TableModel.findByIdAndUpdate(body.tableId, {
		$pull: { orders: { _id: body.orderId } },
	}).catch((err) => {
		console.log('Query failed');
		res.status(500).json({ error: err });
	});

	if (queryResult) {
		console.log(`Data successfully deleted`);
		res.status(200).json({ status: 'success' });
	} else {
		return;
	}

	const notification = await NotificationModel.create({
		message: `${queryResult.tableName} canceled ${body.qty} ${body.foodName}`,
	});
});

module.exports = router;
