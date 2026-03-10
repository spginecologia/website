/* * */

import payloadConfig from '@/payload-config';
import { validateTaxId } from '@/services/general/validate-tax-id';
import { type SignupApprovalRequest, type SignupApprovalResponse } from '@/services/payload/collections/Signup/types';
import { payloadGetUser } from '@/services/payload/utils/payload-get-user';
import { getPayload } from 'payload';
import { User } from 'payload-types';

/* * */

export async function POST(request: Request) {
	try {
		//

		//
		// Add an artificial delay to prevent abuse

		await new Promise(resolve => setTimeout(resolve, 1_000));

		const payload = await getPayload({ config: payloadConfig });

		//
		// Parse the request body

		const requestBody: SignupApprovalRequest = await request.json();

		//
		// Validate the proponent user
		// (the user that requested the signup)

		const isValidProponentTaxId = validateTaxId(requestBody.proponent_tax_id, false, ['singular']);

		if (!isValidProponentTaxId) {
			const response: SignupApprovalResponse = { error: 'Proponent Tax ID is invalid.' };
			return new Response(JSON.stringify(response), { status: 400 });
		}

		const foundProponentUser = await payloadGetUser(requestBody.proponent_tax_id);

		if (!foundProponentUser) {
			const response: SignupApprovalResponse = { error: 'Proponent user not found.' };
			return new Response(JSON.stringify(response), { status: 404 });
		}

		if (foundProponentUser.account_status === 'active') {
			const response: SignupApprovalResponse = { status: 'approved' };
			return new Response(JSON.stringify(response), { status: 200 });
		}

		//
		// Validate the sponsor user
		// (the user that should approve or reject the proponent user)

		const isValidSponsorTaxId = validateTaxId(requestBody.sponsor_tax_id, false, ['singular']);

		if (!isValidSponsorTaxId) {
			const response: SignupApprovalResponse = { error: 'Sponsor Tax ID is invalid.' };
			return new Response(JSON.stringify(response), { status: 400 });
		}

		const foundSponsorUser = await payloadGetUser(requestBody.sponsor_tax_id);

		if (!foundSponsorUser) {
			const response: SignupApprovalResponse = { error: 'Sponsor user not found.' };
			return new Response(JSON.stringify(response), { status: 404 });
		}

		const isActiveSponsorUser = foundSponsorUser.account_status === 'active';

		if (!isActiveSponsorUser) {
			const response: SignupApprovalResponse = { error: 'Sponsor user is not active.' };
			return new Response(JSON.stringify(response), { status: 400 });
		}

		//
		// Check if the proponent user has a matching
		// approval request for the sponsor user.

		const matchingApprovalRequest = foundProponentUser.enrolment_sponsors.find(item => item.id === requestBody.approval_id);

		if (!matchingApprovalRequest) {
			const response: SignupApprovalResponse = { error: 'No matching approval request found for this sponsor user.' };
			return new Response(JSON.stringify(response), { status: 400 });
		}

		//
		// If the decision is just a status request,
		// then return the current status of the approval request

		if (requestBody.decision === 'status_request') {
			const response: SignupApprovalResponse = { status: matchingApprovalRequest.response_status };
			return new Response(JSON.stringify(response), { status: 200 });
		}

		//
		// Otherwise, the decision is an approval or rejection of the proponent user.
		// Update the approval request status in the database here.

		const updatedEnrolmentSponsors: User['enrolment_sponsors'] = foundProponentUser.enrolment_sponsors.map((item) => {
			if (item.id !== requestBody.approval_id) return item;
			return {
				...item,
				response_status: requestBody.decision === 'approve' ? 'approved' : 'rejected',
			};
		});

		await payload.update({
			collection: 'users',
			data: {
				enrolment_sponsors: updatedEnrolmentSponsors,
			},
			id: foundProponentUser.id,
		});

		return new Response(JSON.stringify({ status: requestBody.decision === 'approve' ? 'approved' : 'rejected' }), { status: 200 });

		//
	} catch (err) {
		console.error(err);
		return new Response(err.message, { status: 401 });
	}
}
