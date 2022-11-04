const express = require('express');
const router = express.Router();
const TableSectionModel = require('../models/tableSection');
const TableModel = require('../models/table');

// -- Add tableSection
router.post('/', async (req, res) => {
	console.log(`TableSection ${req.method} request called`);
	const body = req.body;

	const queryResult = await TableSectionModel.create(body).catch((err) => {
		console.log('Query failed');
		res.status(500).json({ error: err });
	});

	if (queryResult) {
		console.log(`Data successfully created`);
		res.status(200).json({ status: 'success' });
	}
});

// -- Get tableSection
router.get('/', async (req, res) => {
	console.log(`TableSection ${req.method} request called`);
	const body = req.body;

	const queryResult = await TableSectionModel.find()
		.sort({ sectionName: 1 })
		.catch((err) => {
			console.log('Query failed');
			res.status(500).json({ error: err });
		});

	if (queryResult) {
		console.log(`Data successfully retrieved`);
		res.status(200).json(queryResult);
	}
});

// -- Update tableSection
router.put('/', async (req, res) => {
	console.log(`TableSection ${req.method} request called`);
	const body = req.body;

	const queryResult = await TableSectionModel.updateOne(
		{ _id: body.sectionId },
		{ $set: { sectionName: body.sectionName } }
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

// -- Remove tableSection
router.delete('/', async (req, res) => {
	console.log(`TableSection ${req.method} request called`);
	const body = req.body;

	const tableSection = await TableSectionModel.findById(body.sectionId);

	if (!tableSection) {
		console.log(`Section not Found`);
		res.status(404).json({ error: 'Delete failed, check inputs' });
		return;
	}

	if (tableSection.tables.length > 0) {
		const removeTableQuery = await TableModel.deleteMany({
			_id: { $in: tableSection.tables },
		}).catch((err) => {
			console.log('Query failed');
			res.status(500).json({ error: err });
		});

		if (removeTableQuery.deletedCount !== tableSection.tables.length) {
			console.log(`Deleting table failed`);
			res.status(404).json({ error: 'Delete failed, check inputs' });
			return;
		}
	}

	const queryResult = await TableSectionModel.deleteOne({
		_id: body.sectionId,
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
