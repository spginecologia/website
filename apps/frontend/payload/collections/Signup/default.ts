/* * */

import { SignupForm } from '@/payload/collections/Signup/validation';

/* * */

export const SignupFormDefault: SignupForm = {
	address_1: 'Rua 123',
	address_2: '',
	billing_address_1: '',
	billing_address_2: '',
	billing_city: '',
	billing_name: '',
	billing_postal_code: '',
	billing_tax_id: '',
	birthday: new Date(1900, 0, 1),
	city: 'Lisboa',
	country: 'Portugal',
	email: '',
	first_name: 'Teste',
	last_name: 'OlaOla',
	medical_id: 1234,
	phone: '123456789',
	postal_code: '1234-567',
	send_newsletter: true,
	subscribed_sections: [],
	tax_id: '123456789',
	title: null,
	workplace_primary: '',
	workplace_secondary: '',
};
