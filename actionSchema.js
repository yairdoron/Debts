var mongoose = require('mongoose'),
	schema = mongoose.Schema;

var actionSchema = new schema({
	name: String,
	info: String,
	debt: Number,
	address: String,
	atm: Number,
	box: Number,
	date: String
}, {collection: 'd'});

exports.actionSchema = actionSchema;