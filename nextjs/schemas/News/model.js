/* * */

import mongoose from 'mongoose';

/* * */

export const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 50,
    unique: true,
  },
  description: {
    type: String,
    maxlength: 500,
  },
});

/* * */

export const NewsModel = mongoose?.models?.News || mongoose.model('News', NewsSchema);
