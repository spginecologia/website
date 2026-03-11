/* * */

import payloadConfig from '@/payload-config';
import { LOGGER } from '@/services/logger/LOGGER';
import { SignupOptions } from '@/services/payload/collections/Signup/options';
import { sendUserSignupApprovalEmail } from '@/services/payload/collections/User/actions/send-user-signup-approval-email';
import { getPayload } from 'payload';

/**
 * This function updates the user's account status
 * based on their enrolment sponsors' approval.
 * @param userId The ID of the user to update.
 * @throws Error if the user is not found or if there is an error during the update process.
 */
export async function updateUserAccountStatus(userId: string) {
	//

	const payload = await getPayload({ config: payloadConfig });

	//
	// Fetch the requested User data
	// and validate if it exists and is active.

	const userData = await payload.findByID({
		collection: 'users',
		id: userId,
	});

	if (!userData) {
		LOGGER.error('update-user-account-status', `User with ID "${userId}" not found. Skipping...`);
		return;
	}

	//
	// Skip if the user already has an enrolment approval date.
	// This means the user has already been approved
	// and the activation email has already been sent.

	if (userData.enrolment_approval_date) {
		LOGGER.info('update-user-account-status', `User with ID "${userId}" already has an enrolment approval date. Skipping...`);
		return;
	}

	//
	// Handle the case where the user is "active" but has no enrolment approval date.
	// This happens when the user has just been approved. In this case, we need to send
	// the activation email and update the enrolment approval date.

	if (userData.account_status === 'active' && !userData.enrolment_approval_date) {
		LOGGER.info('update-user-account-status', `User with ID "${userId}" is active but has no enrolment approval date. Sending activation email and updating enrolment approval date...`);
		await sendUserSignupApprovalEmail(userData);
		return;
	}

	//
	// Skip if the enrolment type is not "effective".
	// Only users with "effective" enrolment type can have
	// their status updated to "active" automatically based
	// on their sponsors' approval.

	if (userData.enrolment_type !== 'effective') {
		LOGGER.info('update-user-account-status', `User with ID "${userId}" enrolment type is "${userData.enrolment_type}" which is not "effective". Skipping...`);
		return;
	}

	//
	// Check the status of each sponsor response
	// and update the user account_status accordingly.

	if (!userData.enrolment_sponsors?.length) {
		LOGGER.error('update-user-account-status', `User with ID "${userId}" does not have any enrolment sponsors. Skipping...`);
		return;
	}

	let countOfAcceptedSponsorResponses = 0;

	userData.enrolment_sponsors.forEach((sponsor) => {
		if (sponsor.response_status !== 'approved') return;
		countOfAcceptedSponsorResponses++;
	});

	//
	// If the user has at least two approved sponsor responses,
	// we can consider the user as "active" and send the activation email.

	if (countOfAcceptedSponsorResponses < SignupOptions.required_sponsor_count) {
		LOGGER.info('update-user-account-status', `User with ID "${userId}" has only ${countOfAcceptedSponsorResponses} approved sponsor responses. Skipping...`);
		return;
	}

	await payload.update({
		collection: 'users',
		data: {
			account_status: 'active',
		},
		id: userId,
	});

	LOGGER.info('update-user-account-status', `User with ID "${userId}" has been updated to "active" status based on their sponsors' approval.`);

	//
};
