const express = require('express');
const router = express.Router();
const OrderListingModel = require('../models/orderListing');
const TransactionModel = require('../models/transaction');

router.post('/', async (req, res) => {
	console.log(`Order ${req.method} request called`);
	const body = req.body;
	console.log(body);

	const orderListingQuery = await OrderListingModel.create(body).catch(
		(err) => {
			console.log('Query failed');
			res.status(500).json({ error: err });
		}
	);

	if (!orderListingQuery) {
		return;
	}

	const transactionQuery = await TransactionModel.create(body).catch((err) => {
		console.log('Query failed');
		res.status(500).json({ error: err });
	});

	if (transactionQuery && orderListingQuery) {
		console.log(`Data successfully created: ${transactionQuery}`);
		res.json({ status: 'success' });
	}
});

module.exports = router;
