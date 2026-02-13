/* eslint-disable perfectionist/sort-objects */

/* * */

import { type User } from 'payload-types';

/**
 * Parse a user document from Payload for export,
 * ensuring that only non-sensitive fields are included.
 * This function can be used to prepare user data
 * for CSV export or similar use cases.
 * @param userData The user document retrieved from Payload.
 * @returns An object containing only the fields that are safe to export.
 */
export function payloadParseUserForExport(userData: User) {
	return {
		//
		tax_id: userData.tax_id,
		title: userData.title,
		first_name: userData.first_name,
		last_name: userData.last_name,
		account_status: userData.account_status,
		account_role: userData.account_role,
		email: userData.email,
		phone: userData.phone,
		member_since: userData.member_since,
		is_intern: userData.is_intern,
		//
		address_1: userData.address_1,
		address_2: userData.address_2,
		postal_code: userData.postal_code,
		city: userData.city,
		country: userData.country,
		//
		subscribed_sections: userData.subscribed_sections?.join('|'),
		//
		workplace_primary: userData.workplace_primary,
		workplace_secondary: userData.workplace_secondary,
		//
		billing_name: userData.billing_name,
		billing_tax_id: userData.billing_tax_id,
		billing_address_1: userData.billing_address_1,
		billing_address_2: userData.billing_address_2,
		billing_postal_code: userData.billing_postal_code,
		billing_city: userData.billing_city,
		//
	};
}
