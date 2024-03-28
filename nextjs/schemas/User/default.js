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
    //
    news: {
      view: { is_allowed: false },
      edit: { is_allowed: false },
      create: { is_allowed: false },
      delete: { is_allowed: false },
      navigate: { is_allowed: false },
    },
    //
    agenda: {
      view: { is_allowed: false },
      edit: { is_allowed: false },
      create: { is_allowed: false },
      delete: { is_allowed: false },
      navigate: { is_allowed: false },
    },
    //
    videos: {
      view: { is_allowed: false },
      edit: { is_allowed: false },
      create: { is_allowed: false },
      delete: { is_allowed: false },
      navigate: { is_allowed: false },
    },
    //
    guidelines: {
      view: { is_allowed: false },
      edit: { is_allowed: false },
      create: { is_allowed: false },
      delete: { is_allowed: false },
      navigate: { is_allowed: false },
    },
    //
    publications: {
      view: { is_allowed: false },
      edit: { is_allowed: false },
      create: { is_allowed: false },
      delete: { is_allowed: false },
      navigate: { is_allowed: false },
    },
    //
    courses: {
      view: { is_allowed: false },
      edit: { is_allowed: false },
      create: { is_allowed: false },
      delete: { is_allowed: false },
      navigate: { is_allowed: false },
    },
    //
    topics: {
      view: { is_allowed: false },
      edit: { is_allowed: false },
      create: { is_allowed: false },
      delete: { is_allowed: false },
      navigate: { is_allowed: false },
    },
    //
    testimonials: {
      view: { is_allowed: false },
      edit: { is_allowed: false },
      create: { is_allowed: false },
      delete: { is_allowed: false },
      navigate: { is_allowed: false },
    },
    //
    tributes: {
      view: { is_allowed: false },
      edit: { is_allowed: false },
      create: { is_allowed: false },
      delete: { is_allowed: false },
      navigate: { is_allowed: false },
    },
    //
    users: {
      view: { is_allowed: false },
      edit: { is_allowed: false },
      edit_permissions: { is_allowed: false },
      approve: { is_allowed: false },
      charge_money: { is_allowed: false },
      create: { is_allowed: false },
      delete: { is_allowed: false },
      navigate: { is_allowed: false },
    },
    //
    admin: {
      backoffice: { is_allowed: false },
      debug: { is_allowed: false },
    },
    //
  },
  //
  stripe_customer_id: null,
  //
  subscription: {
    stripe_id: null,
    status: null,
    current_period_end: null,
    canceled_at: null,
  },
  //
};
