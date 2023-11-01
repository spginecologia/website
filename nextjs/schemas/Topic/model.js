/* * */

import mongoose from 'mongoose';

/* * */

export const TopicSchema = new mongoose.Schema({
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

export const TopicModel = mongoose?.models?.Topic || mongoose.model('Topic', TopicSchema);
