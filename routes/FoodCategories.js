const express = require('express');
const router = express.Router();
const FoodCategoryModel = require('../models/menu');

// -- Add new foodCategory
router.post('/', async (req, res) => {
	console.log(`Category ${req.method} request called`);
	const body = req.body;

	const queryResult = await FoodCategoryModel.create(body).catch((err) => {
		console.log('Query failed');
		res.status(500).json({ error: err });
	});

	if (queryResult) {
		console.log(`Data successfully created: ${queryResult}`);
		res.status(200).json({ status: 'success' });
	}
});

// -- Get foodCategory
router.get('/', async (req, res) => {
	console.log(`Category ${req.method} request called`);
	const body = req.body;

	const queryResult = await FoodCategoryModel.find({}, { categoryName: 1 })
		.sort({ categoryName: 1 })
		.catch((err) => {
			console.log('Query failed');
			res.status(500).json({ error: err });
		});

	if (queryResult) {
		console.log(`Data successfully retrieved: ${queryResult}`);
		res.status(200).json(queryResult);
	}
});

// -- Update foodCategory
router.put('/', async (req, res) => {
	console.log(`Category ${req.method} request called`);
	const body = req.body;

	const queryResult = await FoodCategoryModel.updateOne(
		{ _id: body.categoryId },
		{ $set: { categoryName: body.categoryName } }
	).catch((err) => {
		console.log('Query failed');
		res.status(500).json({ error: err });
	});

	if (queryResult) {
		if (queryResult.matchedCount > 0) {
			console.log(`Data successfully updated`);
			res.status(200).json({ status: 'success' });
		} else {
			console.log(`No data modified`);
			res.status(404).json({ error: 'Update failed, check input data' });
		}
	}
});

// -- Remove foodCategory
router.delete('/', async (req, res) => {
	console.log(`Category ${req.method} request called`);
	const body = req.body;

	const queryResult = await FoodCategoryModel.deleteOne({
		_id: body.categoryId,
	}).catch((err) => {
		console.log('Query failed');
		res.status(500).json({ error: err });
	});

	if (queryResult) {
		if (queryResult.deletedCount > 0) {
			console.log(`Data successfully deleted`);
			res.status(200).json({ status: 'success' });
		} else {
			console.log(`Data not Found: ${queryResult}`);
			res.status(404).json({ error: 'Delete failed, check inputs' });
		}
	}
});

module.exports = router;
