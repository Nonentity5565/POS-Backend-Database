const express = require('express');
const router = express.Router();
const OrderListingModel = require('../models/orderListing');

router.get('/', async (req, res) => {
	console.log(`OrderListing ${req.method} request called`);
	const body = req.body;

	const queryResult = await OrderListingModel.find()
		.sort({ time: 1 })
		.catch((err) => {
			console.log('Query failed');
			res.status(500).json({ error: err });
		});

	if (!queryResult) {
		return;
	}

	console.log(`Data successfully retrieved: ${queryResult}`);
	res.status(200).json(queryResult);

	// if (queryResult.length === 0) {
	// 	console.log(`No OrderListing, cancel deleting`);
	// 	return;
	// }

	// console.log(`Deleting sent data`);
	// const idList = queryResult.map((order) => order._id);

	// const deleteResult = await OrderListingModel.deleteMany({
	// 	_id: { $in: idList },
	// }).catch((err) => {
	// 	console.log('Delete failed');
	// 	res.status(500).json({ error: err });
	// });

	// if (deleteResult.deletedCount !== queryResult.length) {
	// 	console.log('Delete number mismatched');
	// } else {
	// 	console.log('Deleted successfully');
	// }
});

module.exports = router;
