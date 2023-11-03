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
  birthday: {
    type: Date,
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
    topics: {
      create_edit: {
        type: Boolean,
        default: true,
      },
      delete: {
        type: Boolean,
        default: false,
      },
    },
    //
    users: {
      view: {
        type: Boolean,
        default: false,
      },
      create_edit: {
        type: Boolean,
        default: false,
      },
      delete: {
        type: Boolean,
        default: false,
      },
    },
    //
    admin: {
      backoffice: {
        type: Boolean,
        default: false,
      },
      debug: {
        type: Boolean,
        default: false,
      },
    },
  },
});

/* * */

export const UserModel = mongoose?.models?.User || mongoose.model('User', UserSchema);
