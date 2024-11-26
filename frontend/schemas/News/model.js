/* * */

import mongoose from 'mongoose';

/* * */

export const NewsSchema = new mongoose.Schema({
  //
  is_featured: { type: Boolean, default: false },
  //
  title: { type: String, maxlength: 100 },
  introduction: { type: String, maxlength: 500 },
  html_body: { type: String, maxlength: 5000 },
  //
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
  //
  featured_image_url: { type: String, maxlength: 200 },
  featured_image_filename: { type: String, maxlength: 200 },
  //
  created_at: { type: Date },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updated_at: { type: Date },
  updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  published_at: { type: Date },
  published_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  //
});

/* * */

export const NewsModel = mongoose?.models?.News || mongoose.model('News', NewsSchema);
