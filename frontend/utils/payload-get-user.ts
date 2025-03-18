/* * */

import { type User } from '@/payload-types';
import { validateTaxId } from '@/utils/validate-tax-id';
import payloadConfig from '@payload-config';
import { getPayload } from 'payload';

/**
 * Finds and returns a User from the database based on the given username (email or Tax ID).
 * @param username The username (email or Tax ID) to search for.
 * @returns The User object if found, or null if not found.
 */
export async function payloadGetUser(username: string): Promise<null | User> {
	//

	const payload = await getPayload({ config: payloadConfig });

	//
	// Check if the username is an email or a Tax ID.

	const isTaxId = validateTaxId(username, false, ['singular']);

	//
	// Find the user based on the username.

	if (isTaxId) {
		const result = await payload.find({
			collection: 'users',
			where: { tax_id: { equals: username } },
		});
		if (result.docs.length === 0) {
			console.log(`User not found for given Tax ID: ${username}`);
			return null;
		}
		return result.docs[0];
	}
	else {
		const result = await payload.find({
			collection: 'users',
			where: { email: { equals: username } },
		});
		if (result.docs.length === 0) {
			console.log(`User not found for given email: ${username}`);
			return null;
		}
		return result.docs[0];
	}

	//
}
