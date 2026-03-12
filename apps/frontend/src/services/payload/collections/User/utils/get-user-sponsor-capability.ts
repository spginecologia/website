/* * */

import { type User } from 'payload-types';

/**
 * Check if the user has the capability to be a sponsor.
 * A user has the capability to be a sponsor if they exist, have an active account,
 * and have an enrollment_type of 'effective' or 'direct'.
 * @param userData The user data to check.
 * @returns `true`if the user has the capability to be a sponsor, `false` otherwise.
 */
export function getUserSponsorCapability(userData: null | undefined | User): boolean {
	//

	if (!userData) {
		return false;
	}

	//
	// Check if the user is active and has an eligible enrolment type

	const isActiveUser = userData.account_status === 'active';

	const isEligibleEnrolmentType = userData.enrolment_type === 'effective' || userData.enrolment_type === 'direct';

	if (isActiveUser && isEligibleEnrolmentType) {
		return true;
	}

	return false;

	//
}
