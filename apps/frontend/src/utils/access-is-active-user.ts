/* * */

import { type User } from 'payload-types';

/* * */

export function accessIsActiveUser(userData?: null | User): boolean {
	//

	// Return false if no user is logged in
	if (!userData) return false;

	// Return false if user account is 'pending'
	if (userData.account_status === 'pending') return false;

	// Return true otherwise
	return true;

	//
}
