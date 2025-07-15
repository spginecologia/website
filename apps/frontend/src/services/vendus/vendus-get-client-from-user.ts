/* * */

import { type VendusClient } from '@/services/vendus/types';
import { type User } from 'payload-types';

/**
 * This function converts a user object to a Vendus client object.
 * It prioritizes the user's (optional) billing details over the actual
 * user details, as if they are present, they indicate a need for invoices
 * to be issued with those details. If the user does not have billing details,
 * it falls back to the user's details.
 * @param userData User data to convert to Vendus client.
 * @returns Vendus client object.
 * @throws if there are no useful billing details or user details.
 */
export function vendusGetClientFromUser(userData: User): VendusClient {
	//

	//
	// Check if the user has the minimum required
	// billing details set, and use them if available.

	if (userData.billing_name && userData.billing_tax_id) {
		return {
			address: `${userData.billing_address_1 ?? ''} ${userData.billing_address_2 ?? ''}`.trim(),
			city: userData.billing_city ?? '',
			country: 'PT',
			fiscal_id: userData.billing_tax_id,
			name: userData.billing_name,
			postalcode: userData.billing_postal_code ?? '',
			send_email: 'no',
		};
	}

	//
	// If the user does not have billing details,
	// use the user's details instead, if available.

	if (userData.first_name && userData.tax_id) {
		return {
			address: `${userData.address_1 ?? ''} ${userData.address_2 ?? ''}`.trim(),
			city: userData.city ?? '',
			country: 'PT',
			fiscal_id: userData.tax_id,
			name: `${userData.first_name} ${userData.last_name ?? ''}`.trim(),
			postalcode: userData.postal_code ?? '',
			send_email: 'no',
		};
	}

	throw new Error(`User NIF ${userData.tax_id} does not have any useful billing details or user details to create a Vendus client.`);

	//
}
