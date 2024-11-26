/* * */

import mongoose from 'mongoose';

/* * */

export const LinkSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 50,
  },
  subtitle: {
    type: String,
    maxlength: 500,
  },
  href: {
    type: String,
    maxlength: 500,
  },
  sort_order: {
    type: Number,
  },
  is_active: {
    type: Boolean,
    default: false,
  },
  is_featured: {
    type: Boolean,
    default: false,
  },
});

/* * */

export const LinkModel = mongoose?.models?.Link || mongoose.model('Link', LinkSchema);
