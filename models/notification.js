const mongoose = require('mongoose');
const { kds_db } = require('../database/database');

const notificationSchema = mongoose.Schema(
	{
		message: { type: String, required: true },
		time: { type: Date, default: Date.now },
	},
	{ collection: 'notifications' }
);

const NotificationModel = kds_db.model('NotificationModel', notificationSchema);

module.exports = NotificationModel;
