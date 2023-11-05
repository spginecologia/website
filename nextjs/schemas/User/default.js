/* * */

export const UserDefault = {
  //
  title: '',
  first_name: '',
  last_name: '',
  full_name: '',
  display_name: '',
  short_display_name: '',
  //
  phone: '',
  email: '',
  medical_id: '',
  birthday: null,
  //
  personal_tax_id: '',
  personal_address_1: '',
  personal_address_2: '',
  personal_postal_code: '',
  personal_city: '',
  personal_country: 'Portugal',
  //
  billing_tax_id: '',
  billing_name: '',
  billing_address_1: '',
  billing_address_2: '',
  billing_postal_code: '',
  billing_city: '',
  billing_country: 'Portugal',
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
    admin: { backoffice: false, debug: false },
    news: { create_edit: false, delete: false },
    agenda: { create_edit: false, delete: false },
    videos: { view: false, upload: false, create_edit_own: false, approve: false, create_edit_all: false, delete: false },
    guidelines: { create_edit: false, delete: false },
    publications: { view: false, create_edit: false, delete: false },
    courses: { view: false, create_edit: false, delete: false },
    topics: { create_edit: false, delete: false },
    testimonials: { create_edit: false, delete: false },
    tributes: { create_edit: false, delete: false },
    users: { view: false, create_edit: false, permissions: false, approve: false, charge_money: false, delete: false },
  },
  //
};
