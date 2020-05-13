const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [ true, 'You need to add a title' ],
		unique: true,
		trim: true,
		maxlength: [ 40, 'Title must be less than 40 characters' ]
	},
	description: {
		type: String,
		required: true,
		maxlength: [ 200, 'Title must be less than 200 characters' ]
	}
});

const Trip = mongoose.models.Trip || mongoose.model('Trip', TripSchema);

module.exports = { Trip };
