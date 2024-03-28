/* * */

import mongoose from 'mongoose';

/* * */

export const GuidelineSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 50,
  },
  document_type: {
    type: String,
    maxlength: 500,
  },
  document_url: {
    type: String,
    maxlength: 500,
  },
  document_document: {
    type: Number,
  },
  topics: {
    type: Boolean,
    default: false,
  },
  cover_image: {
    type: Boolean,
    default: false,
  },
  is_featured: {
    type: Boolean,
    default: false,
  },
});

/* * */

export const GuidelineModel = mongoose?.models?.Guideline || mongoose.model('Guideline', GuidelineSchema);
