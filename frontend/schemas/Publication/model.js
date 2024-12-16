/* * */

import mongoose from 'mongoose';

/* * */

export const GuidelineSchema = new mongoose.Schema({
	cover_image: {
		default: false,
		type: Boolean,
	},
	document_document: {
		type: Number,
	},
	document_type: {
		maxlength: 500,
		type: String,
	},
	document_url: {
		maxlength: 500,
		type: String,
	},
	is_featured: {
		default: false,
		type: Boolean,
	},
	title: {
		maxlength: 50,
		type: String,
	},
	topics: [
		{
			ref: 'Topic',
			type: mongoose.Schema.Types.ObjectId,
		},
	],
});

/* * */

export const GuidelineModel = mongoose?.models?.Guideline || mongoose.model('Guideline', GuidelineSchema);
