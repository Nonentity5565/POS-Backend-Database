const mongoose = require('mongoose');

const pos_db = mongoose.createConnection(
	'mongodb://localhost:27017/Restaurant_POS',
	{ keepAlive: true }
);

const kds_db = mongoose.createConnection(
	'mongodb://localhost:27017/Restaurant_KDS',
	{ keepAlive: true }
);

module.exports = { pos_db, kds_db };
