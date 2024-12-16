/* * */

import mongoose from 'mongoose';

/* * */

export const LinkSchema = new mongoose.Schema({
	href: {
		maxlength: 500,
		type: String,
	},
	is_active: {
		default: false,
		type: Boolean,
	},
	is_featured: {
		default: false,
		type: Boolean,
	},
	sort_order: {
		type: Number,
	},
	subtitle: {
		maxlength: 500,
		type: String,
	},
	title: {
		maxlength: 50,
		type: String,
	},
});

/* * */

export const LinkModel = mongoose?.models?.Link || mongoose.model('Link', LinkSchema);
