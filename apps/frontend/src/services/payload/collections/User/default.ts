/* * */

import { type UserEditableProfile } from '@/services/payload/collections/User/validation';

/* * */

export const UserEditableProfileDefault: UserEditableProfile = {
	address_1: '',
	address_2: '',
	billing_address_1: '',
	billing_address_2: '',
	billing_city: '',
	billing_name: '',
	billing_postal_code: '',
	billing_tax_id: '',
	city: '',
	country: 'Portugal',
	email: '',
	first_name: '',
	is_intern: false,
	last_name: '',
	phone: '',
	postal_code: '',
	send_newsletter: true,
	subscribed_sections: [],
	title: '',
	workplace_primary: '',
	workplace_secondary: '',
};
