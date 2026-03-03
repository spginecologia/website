/* eslint-disable @stylistic/no-mixed-spaces-and-tabs */

/* * */

import payloadConfig from '@/payload-config';
import { getAnonymizedEmail } from '@/services/general/get-anonymized-email';
import { type SignupResponse } from '@/services/payload/collections/Signup/types';
import { type SignupForm, SignupFormValidation } from '@/services/payload/collections/Signup/validation';
import { payloadGetUser } from '@/services/payload/utils/payload-get-user';
import { payloadSendSignupEmail } from '@/services/payload/utils/payload-send-signup-email';
import { getPayload } from 'payload';

/* * */

export async function POST(request: Request) {
	try {
		//

		const payload = await getPayload({ config: payloadConfig });

		const requestBody: SignupForm = await request.json();

		//
		// Check if an user already exists with the same email

		const foundUserByEmail = await payloadGetUser(requestBody.email);

		if (foundUserByEmail) {
			const response: SignupResponse = {
				anonymized_email: getAnonymizedEmail(foundUserByEmail.email),
				status: 'user_exists',
			};
			return new Response(JSON.stringify(response), { status: 200 });
		}

		//
		// Check if an user already exists with the same Tax ID

		const foundUserByTaxId = await payloadGetUser(requestBody.tax_id);

		if (foundUserByTaxId) {
			const response: SignupResponse = {
				anonymized_email: getAnonymizedEmail(foundUserByTaxId.email),
				status: 'user_exists',
			};
			return new Response(JSON.stringify(response), { status: 200 });
		}

		//
		// If no user exists with those credentials,
		// then proceed with creating a new user.
		// Validate the form data against the schema.

		const validatedData = SignupFormValidation.parse(requestBody) as SignupForm;

		//
		// Now create the user object using the validated data.
		// Override the birthday field to be a string and set the enrolment_approval_date field to the current date.
		// New users start with a pending account status until they are approved by an admin.

		const newUserData = await payload.create({
			collection: 'users',
			data: {
				account_role: 'member',
				account_status: 'waiting',
				address_1: validatedData.address_1,
				address_2: validatedData.address_2,
				billing_address_1: validatedData.billing_address_1,
				billing_address_2: validatedData.billing_address_2,
				billing_city: validatedData.billing_city,
				billing_name: validatedData.billing_name,
				billing_postal_code: validatedData.billing_postal_code,
				billing_tax_id: validatedData.billing_tax_id,
				birthday: validatedData.birthday || null,
				city: validatedData.city,
				country: validatedData.country,
				email: validatedData.email,
				enrolment_type: validatedData.enrolment_type,
				first_name: validatedData.first_name,
				last_name: validatedData.last_name,
				medical_id: validatedData.medical_id,
				password: Math.random().toString(36).slice(0, 20),
				phone: validatedData.phone,
				postal_code: validatedData.postal_code,
				send_newsletter: validatedData.send_newsletter,
				subscribed_sections: validatedData.subscribed_sections
					? validatedData.subscribed_sections.filter(
						section =>
							[
								'colposcopia_patologia_tracto_genital_inferior',
								'endoscopia_ginecologica',
								'ginecologia_oncologica',
								'menopausa',
								'uroginecologia',
							].includes(section),
					) as (
					  | 'colposcopia_patologia_tracto_genital_inferior'
					  | 'endoscopia_ginecologica'
					  | 'ginecologia_oncologica'
					  | 'menopausa'
					  | 'uroginecologia'
					)[]
					: validatedData.subscribed_sections,
				tax_id: validatedData.tax_id,
				title: [
					'(nenhum)',
					'Dr.',
					'Dr.ª',
					'Exmo.',
					'Exmo.ª',
					null,
					'Prof.',
					'Prof.ª',
					'Sr.',
					'Sr.ª',
					undefined,
				].includes(validatedData.title)
					? (validatedData.title as
					| '(nenhum)'
					| 'Dr.'
					| 'Dr.ª'
					| 'Exmo.'
					| 'Exmo.ª'
					| 'Prof.'
					| 'Prof.ª'
					| 'Sr.'
					| 'Sr.ª'
					| null
					| undefined)
					: '(nenhum)',
				workplace_primary: validatedData.workplace_primary,
				workplace_secondary: validatedData.workplace_secondary,
			},
		});

		//
		// Send a welcome email to the new user

		await payloadSendSignupEmail(newUserData);

		//
		// Return a success response

		const response: SignupResponse = { status: 'user_created' };
		return new Response(JSON.stringify(response), { status: 200 });

		//
	} catch (err) {
		console.error(err);
		return new Response(err.message, { status: 401 });
	}
}
