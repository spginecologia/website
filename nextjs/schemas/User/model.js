/* * */

import mongoose from 'mongoose';

/* * */

export const UserSchema = new mongoose.Schema({
  //
  title: {
    type: String,
    maxlength: 10,
  },
  first_name: {
    type: String,
    maxlength: 25,
  },
  last_name: {
    type: String,
    maxlength: 25,
  },
  full_name: {
    type: String,
    maxlength: 150,
  },
  display_name: {
    type: String,
    maxlength: 25,
  },
  short_display_name: {
    type: String,
    maxlength: 25,
  },
  //
  email: {
    type: String,
    maxlength: 50,
    unique: true,
  },
  phone: {
    type: String,
    maxlength: 50,
  },
  medical_id: {
    type: String,
    maxlength: 10,
  },
  birthday: {
    type: Date,
  },
  //
  personal_tax_id: {
    type: String,
    maxlength: 11,
    unique: true,
  },
  personal_address_1: {
    type: String,
    maxlength: 100,
  },
  personal_address_2: {
    type: String,
    maxlength: 100,
  },
  personal_postal_code: {
    type: String,
    maxlength: 10,
  },
  personal_city: {
    type: String,
    maxlength: 50,
  },
  personal_country: {
    type: String,
    maxlength: 50,
    default: 'Portugal',
  },
  //
  billing_tax_id: {
    type: String,
    maxlength: 50,
  },
  billing_name: {
    type: String,
    maxlength: 50,
  },
  billing_address_1: {
    type: String,
    maxlength: 100,
  },
  billing_address_2: {
    type: String,
    maxlength: 100,
  },
  billing_postal_code: {
    type: String,
    maxlength: 10,
  },
  billing_city: {
    type: String,
    maxlength: 50,
  },
  billing_country: {
    type: String,
    maxlength: 50,
  },
  //
  primary_workplace: {
    type: String,
    maxlength: 100,
  },
  secondary_workplace: {
    type: String,
    maxlength: 100,
  },
  //
  favorite_sections: [
    {
      type: String,
      maxlength: 100,
    },
  ],
  favorite_topics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
    },
  ],
  //
  send_newsletter: {
    type: Boolean,
    default: true,
  },
  send_notifications: {
    type: Boolean,
    default: true,
  },
  //
  registration_date: {
    type: Date,
  },
  membership_date: {
    type: Date,
  },
  last_active: {
    type: Date,
  },
  //
  admin_observations: {
    type: String,
    maxlength: 1000,
  },
  //
  permissions: {
    //
    news: {
      view: { is_allowed: { type: Boolean } },
      edit: { is_allowed: { type: Boolean } },
      create: { is_allowed: { type: Boolean } },
      delete: { is_allowed: { type: Boolean } },
      navigate: { is_allowed: { type: Boolean } },
    },
    //
    agenda: {
      view: { is_allowed: { type: Boolean } },
      edit: { is_allowed: { type: Boolean } },
      create: { is_allowed: { type: Boolean } },
      delete: { is_allowed: { type: Boolean } },
      navigate: { is_allowed: { type: Boolean } },
    },
    //
    videos: {
      view: { is_allowed: { type: Boolean } },
      edit: { is_allowed: { type: Boolean } },
      create: { is_allowed: { type: Boolean } },
      delete: { is_allowed: { type: Boolean } },
      navigate: { is_allowed: { type: Boolean } },
    },
    //
    guidelines: {
      view: { is_allowed: { type: Boolean } },
      edit: { is_allowed: { type: Boolean } },
      create: { is_allowed: { type: Boolean } },
      delete: { is_allowed: { type: Boolean } },
      navigate: { is_allowed: { type: Boolean } },
    },
    //
    publications: {
      view: { is_allowed: { type: Boolean } },
      edit: { is_allowed: { type: Boolean } },
      create: { is_allowed: { type: Boolean } },
      delete: { is_allowed: { type: Boolean } },
      navigate: { is_allowed: { type: Boolean } },
    },
    //
    courses: {
      view: { is_allowed: { type: Boolean } },
      edit: { is_allowed: { type: Boolean } },
      create: { is_allowed: { type: Boolean } },
      delete: { is_allowed: { type: Boolean } },
      navigate: { is_allowed: { type: Boolean } },
    },
    //
    topics: {
      view: { is_allowed: { type: Boolean } },
      edit: { is_allowed: { type: Boolean } },
      create: { is_allowed: { type: Boolean } },
      delete: { is_allowed: { type: Boolean } },
      navigate: { is_allowed: { type: Boolean } },
    },
    //
    testimonials: {
      view: { is_allowed: { type: Boolean } },
      edit: { is_allowed: { type: Boolean } },
      create: { is_allowed: { type: Boolean } },
      delete: { is_allowed: { type: Boolean } },
      navigate: { is_allowed: { type: Boolean } },
    },
    //
    tributes: {
      view: { is_allowed: { type: Boolean } },
      edit: { is_allowed: { type: Boolean } },
      create: { is_allowed: { type: Boolean } },
      delete: { is_allowed: { type: Boolean } },
      navigate: { is_allowed: { type: Boolean } },
    },
    //
    users: {
      view: { is_allowed: { type: Boolean } },
      edit: { is_allowed: { type: Boolean } },
      edit_permissions: { is_allowed: { type: Boolean } },
      approve: { is_allowed: { type: Boolean } },
      charge_money: { is_allowed: { type: Boolean } },
      create: { is_allowed: { type: Boolean } },
      delete: { is_allowed: { type: Boolean } },
      navigate: { is_allowed: { type: Boolean } },
    },
    //
    admin: {
      backoffice: { is_allowed: { type: Boolean } },
      debug: { is_allowed: { type: Boolean } },
    },
    //
  },
  //
  stripe_customer_id: {
    type: String,
    maxlength: 100,
  },
  //
  subscription: {
    stripe_id: {
      type: String,
      maxlength: 100,
    },
    status: {
      type: String,
      maxlength: 20,
    },
    current_period_end: {
      type: Number,
    },
    canceled_at: {
      type: Number,
    },
  },

  //
});

/* * */

export const UserModel = mongoose?.models?.User || mongoose.model('User', UserSchema);
