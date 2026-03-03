/* * */

import { validateTaxId } from '@/services/general/validate-tax-id';
import { type SignupSponsorCheckRequest, type SignupSponsorCheckResponse } from '@/services/payload/collections/Signup/types';
import { payloadGetUser } from '@/services/payload/utils/payload-get-user';

/* * */

export async function POST(request: Request) {
	try {
		//

		//
		// Add an artificial delay to prevent abuse

		await new Promise(resolve => setTimeout(resolve, 1_000));

		//
		// Validate the request body

		const requestBody: SignupSponsorCheckRequest = await request.json();

		const isValidTaxId = validateTaxId(requestBody.tax_id, false, ['singular']);

		if (!isValidTaxId) {
			const response: SignupSponsorCheckResponse = { is_valid: false };
			return new Response(JSON.stringify(response), { status: 400 });
		}

		//
		// Check if the requested user exists with the given Tax ID

		const foundUserByTaxId = await payloadGetUser(requestBody.tax_id);

		if (!foundUserByTaxId) {
			const response: SignupSponsorCheckResponse = { is_valid: false };
			return new Response(JSON.stringify(response), { status: 404 });
		}

		//
		// Check if the user is active or not

		const isActiveUser = foundUserByTaxId.account_status === 'active';

		if (!isActiveUser) {
			const response: SignupSponsorCheckResponse = { is_valid: false };
			return new Response(JSON.stringify(response), { status: 200 });
		}

		//
		// If all checks pass, then send a success response

		const response: SignupSponsorCheckResponse = { is_valid: true };
		return new Response(JSON.stringify(response), { status: 200 });

		//
	} catch (err) {
		console.error(err);
		return new Response(err.message, { status: 401 });
	}
}
