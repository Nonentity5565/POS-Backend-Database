const mongoose = require('mongoose');
const { pos_db } = require('../database/database');

const foodObjSchema = new mongoose.Schema({
	foodName: {
		type: String,
		required: true,
		index: { unique: true, sparse: true },
	},
	price: { type: Number, required: true },
});

const foodCategorySchema = new mongoose.Schema(
	{
		categoryName: { type: String, required: true, index: { unique: true } },
		items: [foodObjSchema],
	},
	{ collection: 'menu' }
);

const FoodCategoryModel = pos_db.model('FoodCategoryModel', foodCategorySchema);

module.exports = FoodCategoryModel;
