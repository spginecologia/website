/* * */

import { type User } from 'payload-types';

/* * */

export function payloadIsActiveUser(userData?: null | User): boolean {
	//

	//
	// Return false if no user is logged in

	if (!userData) return false;

	//
	// Return false if user account is 'waiting' for approval

	if (userData.account_status === 'waiting') return false;

	//
	// Return true otherwise

	return true;

	//
}
