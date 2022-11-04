const express = require('express');
const router = express.Router();
const FoodCategoryModel = require('../models/menu');

// -- Add new foodItem // Refactor to use updateOne
router.post('/', async (req, res) => {
	console.log(`Food ${req.method} request called`);
	const body = req.body;

	const category = await FoodCategoryModel.findById(body.categoryId).catch(
		(err) => {
			console.log('Query failed');
			res.status(500).json({ error: err });
		}
	);

	if (!category) {
		console.log('No Category found');
		res.status(404).json({ error: 'Category not found' });
		return;
	}

	console.log(`category found: ${category}`);
	category.items.push(body.foodItem);

	const queryResult = await category.save().catch((err) => {
		console.log('Query failed');
		res.status(500).json({ error: err });
	});

	if (queryResult) {
		console.log(`Data successfully created: ${queryResult}`);
		res.status(200).json({ status: 'success' });
	}
});

// -- Get foodItem
router.get('/', async (req, res) => {
	console.log(`Food ${req.method} request called`);
	const body = req.body;

	const queryResult = await FoodCategoryModel.find(
		{ _id: body.categoryId },
		{ _id: 0, items: 1 }
	).catch((err) => {
		console.log('Query failed');
		res.status(500).json({ error: err });
	});

	if (queryResult.length > 0) {
		console.log(`Data successfully retrieved: ${queryResult}`);
		res.status(200).json(queryResult[0]);
	} else {
		console.log(`Category not found`);
		res.status(404).json({ error: 'Category not found' });
	}
});

// -- Update foodItem
router.put('/', async (req, res) => {
	console.log(`Food ${req.method} request called`);
	const body = req.body;
	try {
		const queryResult = await FoodCategoryModel.updateOne(
			{
				_id: body.categoryId,
				items: { $elemMatch: { _id: body.foodItem.foodId } },
			},
			{
				$set: {
					'items.$.foodName': body.foodItem.foodName,
					'items.$.price': body.foodItem.price,
				},
			}
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
	} catch (err) {
		console.log(`No data modified`);
		res.status(404).json({ error: 'Update failed, check input data' });
	}
});

// -- Remove foodItem
router.delete('/', async (req, res) => {
	console.log(`Food ${req.method} request called`);
	const body = req.body;

	const queryResult = await FoodCategoryModel.updateOne(
		{
			_id: body.categoryId,
			items: { $elemMatch: { _id: body.foodId } },
		},
		{
			$pull: { items: { _id: body.foodId } },
		}
	).catch((err) => {
		console.log('Query failed');
		res.status(500).json({ error: err });
	});

	if (!queryResult) {
		return;
	}

	if (queryResult.modifiedCount > 0) {
		console.log(`Data successfully deleted`);
		res.status(200).json({ status: 'success' });
	} else {
		console.log(`Data not Found: ${queryResult}`);
		res.status(404).json({ error: 'Delete failed, check inputs' });
	}
});

module.exports = router;
