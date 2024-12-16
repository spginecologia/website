/* * */

import mongoose from 'mongoose';

/* * */

export const TopicSchema = new mongoose.Schema({
	description: {
		maxlength: 500,
		type: String,
	},
	title: {
		maxlength: 50,
		type: String,
		unique: true,
	},
});

/* * */

export const TopicModel = mongoose?.models?.Topic || mongoose.model('Topic', TopicSchema);
