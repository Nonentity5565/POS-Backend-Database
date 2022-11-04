const express = require('express');
const router = express.Router();
const TransactionModel = require('../models/transaction');

// -- Add new transaction
router.post('/', async (req, res) => {
	console.log(`Transaction ${req.method} request called`);
	const body = req.body;

	const queryResult = await TransactionModel.create(body).catch((err) => {
		console.log('Query failed');
		res.status(500).json({ error: err });
	});

	if (queryResult) {
		console.log(`Data successfully created: ${queryResult}`);
		res.json({ status: 'success' });
	}
});

// -- Get transaction (tbd)
router.get('/', async (req, res) => {
	console.log(`Category ${req.method} request called`);

	const queryResult = await TransactionModel.find()
		.sort({ date: -1 })
		.limit(50)
		.catch((err) => {
			console.log('Query failed');
			res.status(500).json({ error: err });
		});

	if (queryResult) {
		console.log(`Data successfully retrieved: ${queryResult}`);
		res.status(200).json(queryResult);
	}
});

module.exports = router;
