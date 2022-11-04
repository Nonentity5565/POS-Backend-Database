const mongoose = require('mongoose');
const { pos_db } = require('../database/database');

const tableSectionSchema = new mongoose.Schema(
	{
		sectionName: { type: String, required: true, unique: true },
		tables: [{ type: mongoose.Schema.Types.ObjectId }],
	},
	{ collection: 'tableSections' }
);

const TableSectionModel = pos_db.model('TableSectionModel', tableSectionSchema);

module.exports = TableSectionModel;
