/* * */

import { type User } from 'payload-types';

/**
 * Detects the enrollment year of a user based on their enrollment approval date.
 * @param enrollmentApprovalDate The date when the user's enrollment was approved.
 * @returns The enrollment year of the user, or undefined if the approval date is not provided.
 */
export function getUserEnrollmentYear(enrollmentApprovalDate: User['enrollment_approval_date']): number | undefined {
	//

	if (!enrollmentApprovalDate) return;

	//
	// From the enrollment approval date, extract the year.

	const approvalDate = new Date(enrollmentApprovalDate);

	return approvalDate.getFullYear();

	//
}
