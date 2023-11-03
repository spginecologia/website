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
    //
    news: {
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
    agenda: {
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
    videos: {
      view: {
        type: Boolean,
        default: false,
      },
      upload: {
        type: Boolean,
        default: false,
      },
      create_edit_own: {
        type: Boolean,
        default: false,
      },
      approve: {
        type: Boolean,
        default: false,
      },
      create_edit_all: {
        type: Boolean,
        default: false,
      },
      delete: {
        type: Boolean,
        default: false,
      },
    },
    //
    guidelines: {
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
    publications: {
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
    courses: {
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
    topics: {
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
    testimonials: {
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
    tributes: {
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
    users: {
      view: {
        type: Boolean,
        default: false,
      },
      create_edit: {
        type: Boolean,
        default: false,
      },
      permissions: {
        type: Boolean,
        default: false,
      },
      approve: {
        type: Boolean,
        default: false,
      },
      charge_money: {
        type: Boolean,
        default: false,
      },
      delete: {
        type: Boolean,
        default: false,
      },
    },
  },
});

/* * */

export const UserModel = mongoose?.models?.User || mongoose.model('User', UserSchema);
