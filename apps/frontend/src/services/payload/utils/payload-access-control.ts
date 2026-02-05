/* * */

import { type PayloadRequest } from 'payload';
import { type User } from 'payload-types';

/**
 * This function checks if a user has access to a specific resource
 * based on the provided 'role' value. This function can receive a User
 * either by the request object or directly as a parameter.
 * If no `role` is provided, the function checks only for the User's
 * `account_status` value, effectively checking only if the User is active.
 * @param role The role or roles required to access the resource. If null or undefined, only the user's active status is checked.
 * @param userOrRequest The user object or the request object containing the user data.
 * @returns True if the user has access, false otherwise.
 */
export function payloadAccessControl(role: null | undefined | User['account_role'] | User['account_role'][], userOrRequest: null | PayloadRequest | undefined | User): boolean {
	//

	//
	// If no user or request is provided,
	// deny access immediately

	if (!userOrRequest) {
		return false;
	}

	//
	// Check if we have a user object or a request object

	let userData: User;

	if ('user' in userOrRequest && userOrRequest.user) {
		// The value is a request object
		userData = userOrRequest.user;
	}
	else if ('account_role' in userOrRequest) {
		// The value is a User object
		userData = userOrRequest;
	}
	else {
		// The value is unknown,
		// so access should be denied
		return false;
	}

	//
	// Deny access if we don't have a User

	if (!userData) {
		return false;
	}

	//
	// Check the user's account status.
	// Only allow access if the User is active.

	if (userData.account_status !== 'active') {
		return false;
	}

	//
	// If role was not provided still return true,
	// as the User is active,

	if (!role) {
		return true;
	}

	//
	// Check the role value
	// against the set User value

	if (Array.isArray(role)) {
		return role.includes(userData.account_role);
	}

	if (role === userData.account_role) {
		return true;
	}

	//
	// Else, deny access

	return false;

	//
}
