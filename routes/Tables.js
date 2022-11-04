const express = require('express');
const router = express.Router();
const TableModel = require('../models/table');
const TableSectionModel = require('../models/tableSection');

// -- Add tables
router.post('/', async (req, res) => {
	console.log(`Table ${req.method} request called`);
	const body = req.body;

	const table = await TableModel.create({ tableName: body.tableName }).catch(
		(err) => {
			console.log('Query failed');
			res.status(500).json({ error: err });
		}
	);

	if (!table) {
		return;
	}

	console.log(`Table created ${table}`);

	const queryResult = await TableSectionModel.updateOne(
		{ _id: body.sectionId },
		{ $push: { tables: table._id } }
	).catch((err) => {
		console.log('Query failed');
		res.status(500).json({ error: err });
		TableModel.findByIdAndDelete(table._id);
	});

	if (queryResult) {
		if (queryResult.modifiedCount > 0) {
			console.log(`Table successfully created and added`);
			res.status(200).json({ status: 'success' });
		} else {
			console.log(`Failed to add Table to Table Section`);
			TableModel.findByIdAndDelete(table._id);
			res
				.status(404)
				.json({ error: 'Failed to add Table to Table Section, try again' });
		}
	}
});

// -- Get tables from a section
router.get('/', async (req, res) => {
	console.log(`Table ${req.method} request called`);
	const body = req.body;

	const queryResult = await TableModel.find({
		_id: { $in: body.tables },
	})
		.sort({ tableName: 1 })
		.catch((err) => {
			console.log('Query failed');
			res.status(500).json({ error: err });
		});

	if (queryResult) {
		console.log(`Data successfully retrieved: ${queryResult}`);
		res.status(200).json(queryResult);
	}
});

// Get singular table
router.get('/table', async (req, res) => {
	console.log(`Table ${req.method} request called`);
	const body = req.body;

	const queryResult = await TableModel.findById(body.tableId).catch((err) => {
		console.log('Query failed');
		res.status(500).json({ error: err });
	});

	if (queryResult) {
		console.log(`Data successfully retrieved: ${queryResult}`);
		res.status(200).json(queryResult);
	}
});

// -- Update tables
router.put('/', async (req, res) => {
	console.log(`Table ${req.method} request called`);
	const body = req.body;

	const queryResult = await TableModel.updateOne(
		{ _id: body.tableId },
		{ $set: { tableName: body.tableName } }
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

// -- Remove tables
router.delete('/', async (req, res) => {
	console.log(`Tables ${req.method} request called`);
	const body = req.body;

	const sectionResult = await TableSectionModel.updateOne(
		{ _id: body.sectionId },
		{ $pull: { tables: body.tableId } }
	).catch((err) => {
		console.log('Query failed');
		res.status(500).json({ error: err });
	});

	if (!sectionResult) {
		return;
	}

	if (sectionResult.modifiedCount === 0) {
		console.log(`Failed to remove Table from Table Section`);
		res
			.status(404)
			.json({ error: 'Failed to remove Table to Table Section, try again' });
		return;
	}

	const queryResult = await TableModel.deleteOne({
		_id: body.tableId,
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
