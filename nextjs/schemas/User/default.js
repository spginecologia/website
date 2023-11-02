/* * */

export const UserDefault = {
  //
  title: '',
  first_name: '',
  last_name: '',
  full_name: '',
  birthday: null,
  //
  phone: '',
  email: '',
  medical_id: '',
  //
  personal_tax_id: '',
  personal_address_1: '',
  personal_address_2: '',
  personal_postal_code: '',
  personal_city: '',
  personal_country: '',
  //
  billing_tax_id: '',
  billing_name: '',
  billing_address_1: '',
  billing_address_2: '',
  billing_postal_code: '',
  billing_city: '',
  billing_country: '',
  //
  primary_workplace: '',
  secondary_workplace: '',
  //
  favorite_sections: [],
  favorite_topics: [],
  //
  send_newsletter: true,
  send_notifications: true,
  //
  registration_date: '',
  membership_date: '',
  last_active: '',
  //
  admin_observations: '',
  //
  permissions: {
    //
    topics: {
      create_edit: true,
      delete: false,
    },
    //
    users: {
      view: false,
      create_edit: false,
      delete: false,
    },
    //
    admin: {
      backoffice: false,
      debug: false,
    },
    //
  },
  //
};
