/* * */

import { type SignupForm } from '@/services/payload/collections/Signup/validation';

/* * */

export const SignupFormDefault: SignupForm = {
	address_1: '',
	address_2: '',
	billing_address_1: '',
	billing_address_2: '',
	billing_city: '',
	billing_name: '',
	billing_postal_code: '',
	billing_tax_id: '',
	birthday: '',
	city: '',
	country: 'Portugal',
	email: '',
	enrolment_sponsors: [
		{ is_valid: false, tax_id: '' },
	],
	first_name: '',
	last_name: '',
	medical_id: '',
	medical_specialty: undefined,
	phone: '',
	postal_code: '',
	send_newsletter: true,
	subscribed_sections: [],
	tax_id: '',
	title: null,
	workplace_primary: '',
	workplace_secondary: '',
};
