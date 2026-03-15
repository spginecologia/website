/* * */

import payloadConfig from '@/payload-config';
import { validateTaxId } from '@/services/general/validate-tax-id';
import { type SignupApprovalRequest, type SignupApprovalResponse } from '@/services/payload/collections/Signup/types';
import { getUserDisplayName } from '@/services/payload/collections/User/utils/get-user-display-name';
import { payloadGetUser } from '@/services/payload/utils/payload-get-user';
import { getPayload } from 'payload';
import { User } from 'payload-types';

/* * */

export async function POST(request: Request) {
	try {
		//

		const payload = await getPayload({ config: payloadConfig });

		const requestBody: SignupApprovalRequest = await request.json();

		//
		// Validate the proponent user Tax ID
		// (the user that requested the signup)

		const isValidProponentTaxId = validateTaxId(requestBody.proponent_tax_id, false, ['singular']);

		if (!isValidProponentTaxId) {
			const response: SignupApprovalResponse = { message: 'Proponent Tax ID is invalid.', status: 'error' };
			return new Response(JSON.stringify(response), { status: 400 });
		}

		//
		// Check if the proponent user exists and prepare
		// the common details for the following responses

		const foundProponentUser = await payloadGetUser(requestBody.proponent_tax_id);

		if (!foundProponentUser) {
			const response: SignupApprovalResponse = { message: 'Proponent user not found.', status: 'error' };
			return new Response(JSON.stringify(response), { status: 404 });
		}

		const proponentUserDisplayName = getUserDisplayName(foundProponentUser.title, foundProponentUser.first_name, foundProponentUser.last_name);
		const proponentUserWorkplacePrimary = foundProponentUser.workplace_primary ?? 'N/A';

		//
		// If the proponent user is already active, return that status immediately
		// without checking the sponsor user or the approval request.

		if (foundProponentUser.account_status === 'active') {
			const response: SignupApprovalResponse = {
				proponent_display_name: proponentUserDisplayName,
				proponent_tax_id: foundProponentUser.tax_id,
				proponent_workplace_primary: proponentUserWorkplacePrimary,
				status: 'user_active',
			};
			return new Response(JSON.stringify(response), { status: 200 });
		}

		//
		// Validate the sponsor user
		// (the user that should approve or reject the proponent user)

		const isValidSponsorTaxId = validateTaxId(requestBody.sponsor_tax_id, false, ['singular']);

		if (!isValidSponsorTaxId) {
			const response: SignupApprovalResponse = { message: 'Sponsor Tax ID is invalid.', status: 'error' };
			return new Response(JSON.stringify(response), { status: 400 });
		}

		const foundSponsorUser = await payloadGetUser(requestBody.sponsor_tax_id);

		if (!foundSponsorUser) {
			const response: SignupApprovalResponse = { message: 'Sponsor user not found.', status: 'error' };
			return new Response(JSON.stringify(response), { status: 404 });
		}

		const isActiveSponsorUser = foundSponsorUser.account_status === 'active';

		if (!isActiveSponsorUser) {
			const response: SignupApprovalResponse = { message: 'Sponsor user is not active.', status: 'error' };
			return new Response(JSON.stringify(response), { status: 400 });
		}

		//
		// Check if the proponent user has a matching
		// approval request for the sponsor user.

		const matchingApprovalRequest = foundProponentUser.enrolment_sponsors.find(item => item.id === requestBody.approval_id);

		if (!matchingApprovalRequest) {
			const response: SignupApprovalResponse = { message: 'No matching approval request found for this sponsor user.', status: 'error' };
			return new Response(JSON.stringify(response), { status: 400 });
		}

		//
		// If the decision is just a status request,
		// then return the current status of the approval request

		if (requestBody.decision === 'status_request') {
			let response: SignupApprovalResponse = { message: 'Invalid status.', status: 'error' };
			if (matchingApprovalRequest.response_status === 'approved') {
				response = {
					proponent_display_name: proponentUserDisplayName,
					proponent_tax_id: foundProponentUser.tax_id,
					proponent_workplace_primary: proponentUserWorkplacePrimary,
					status: 'sponsor_approved',
				};
			}
			if (matchingApprovalRequest.response_status === 'rejected') {
				response = {
					proponent_display_name: proponentUserDisplayName,
					proponent_tax_id: foundProponentUser.tax_id,
					proponent_workplace_primary: proponentUserWorkplacePrimary,
					status: 'sponsor_rejected',
				};
			}
			if (matchingApprovalRequest.response_status === 'waiting') {
				response = {
					proponent_display_name: proponentUserDisplayName,
					proponent_tax_id: foundProponentUser.tax_id,
					proponent_workplace_primary: proponentUserWorkplacePrimary,
					status: 'waiting',
				};
			}
			return new Response(JSON.stringify(response), { status: 200 });
		}

		//
		// Otherwise, the decision is an approval or rejection of the proponent user.
		// Update the approval request status in the database here.

		const updatedEnrolmentSponsors: User['enrolment_sponsors'] = foundProponentUser.enrolment_sponsors.map((item) => {
			if (item.id !== requestBody.approval_id) return item;
			return {
				...item,
				response_date: new Date().toISOString(),
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

		const response: SignupApprovalResponse = {
			proponent_display_name: proponentUserDisplayName,
			proponent_tax_id: foundProponentUser.tax_id,
			proponent_workplace_primary: proponentUserWorkplacePrimary,
			status: requestBody.decision === 'approve' ? 'sponsor_approved' : 'sponsor_rejected',
		};

		return new Response(JSON.stringify(response), { status: 200 });

		//
	} catch (err) {
		console.error(err);
		return new Response(err.message, { status: 401 });
	}
}
