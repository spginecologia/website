/* * */

import { type User } from 'payload-types';

/**
 * Detects the enrolment year of a user based on their enrolment approval date.
 * @param enrolmentApprovalDate The date when the user's enrolment was approved.
 * @returns The enrolment year of the user, or undefined if the approval date is not provided.
 */
export function getUserEnrolmentYear(enrolmentApprovalDate: User['enrolment_approval_date']): number | undefined {
	//

	if (!enrolmentApprovalDate) return;

	//
	// From the enrolment approval date, extract the year.

	const approvalDate = new Date(enrolmentApprovalDate);

	return approvalDate.getFullYear();

	//
}
