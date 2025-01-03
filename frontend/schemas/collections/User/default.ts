/* * */

import { UserEditableProfile } from '@/schemas/collections/User/validation';

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
	birthday: new Date(1900, 0, 1),
	city: '',
	country: 'Portugal',
	email: '',
	first_name: '',
	last_name: '',
	phone: '',
	postal_code: '',
	send_newsletter: true,
	subscribed_sections: [],
	title: '',
	workplace_primary: '',
	workplace_secondary: '',
};
