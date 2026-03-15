/* * */

import { getAnonymizedEmail } from '@/services/general/get-anonymized-email';
import { createUserAffiliate } from '@/services/payload/collections/Signup/actions/create-user-affiliate';
import { createUserEffective } from '@/services/payload/collections/Signup/actions/create-user-effective';
import { type SignupResponse } from '@/services/payload/collections/Signup/types';
import { type SignupForm, SignupFormValidation } from '@/services/payload/collections/Signup/validation';
import { payloadGetUser } from '@/services/payload/utils/payload-get-user';

/* * */

export async function POST(request: Request) {
	try {
		//

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
		// Use the corresponding creation function based on the enrolment type.

		if (validatedData.medical_specialty === 'gynecology') {
			await createUserEffective(validatedData);
		} else {
			await createUserAffiliate(validatedData);
		}

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
