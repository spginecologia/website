/* * */

import payloadConfig from '@/payload-config';
import { mollieActivateQuotas } from '@/services/mollie/mollie-activate-quotas';
import { type CollectionAfterChangeHook } from 'payload';
import { getPayload } from 'payload';
import { type Quota } from 'payload-types';

/**
 * This function runs after a `quota` object is updated.
 * When a quota is activated, it is necessary to loop through all Users
 * and create a new mollie Payment Link for each.
 * @param doc The new updated document.
 * @param previousDoc The document before changes.
 */
export const afterActivateQuota: CollectionAfterChangeHook<Quota> = async () => {
	//

	//
	// Get the Payload instance

	const payload = await getPayload({ config: payloadConfig });

	//
	// Get all Users and loop through them

	const allUsers = await payload.find({ collection: 'users' });

	for (const userData of allUsers.docs) {
		//

		await mollieActivateQuotas(userData.id);

		//
	}

	//
};
