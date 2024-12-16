/* * */

import mongoose from 'mongoose';

/* * */

export const NewsSchema = new mongoose.Schema({
	//
	created_at: { type: Date },
	created_by: { ref: 'User', type: mongoose.Schema.Types.ObjectId },
	featured_image_filename: { maxlength: 200, type: String },
	//
	featured_image_url: { maxlength: 200, type: String },
	html_body: { maxlength: 5000, type: String },
	introduction: { maxlength: 500, type: String },
	//
	is_featured: { default: false, type: Boolean },
	published_at: { type: Date },
	published_by: { ref: 'User', type: mongoose.Schema.Types.ObjectId },
	//
	title: { maxlength: 100, type: String },
	//
	topics: [{ ref: 'Topic', type: mongoose.Schema.Types.ObjectId }],
	updated_at: { type: Date },
	updated_by: { ref: 'User', type: mongoose.Schema.Types.ObjectId },
	//
});

/* * */

export const NewsModel = mongoose?.models?.News || mongoose.model('News', NewsSchema);
