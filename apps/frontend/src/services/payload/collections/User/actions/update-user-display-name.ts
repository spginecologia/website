/* * */

import payloadConfig from '@/payload-config';
import { LOGGER } from '@/services/logger/LOGGER';
import { getUserDisplayName } from '@/services/payload/collections/User/utils/get-user-display-name';
import { getPayload } from 'payload';

/**
 * This function updates the user's display name
 * based on their enrollment sponsors' approval.
 * @param userId The ID of the user to update.
 * @throws Error if the user is not found or if there is an error during the update process.
 */
export async function updateUserDisplayName(userId: string) {
	//

	const payload = await getPayload({ config: payloadConfig });

	//
	// Fetch the requested User data

	const userData = await payload.findByID({
		collection: 'users',
		id: userId,
	});

	if (!userData) {
		LOGGER.error('update-user-display-name', `User with ID "${userId}" not found. Skipping...`);
		return;
	}

	//
	// Check the status of each sponsor response
	// and update the user account_status accordingly.

	const userDisplayName = getUserDisplayName(userData.title, userData.first_name, userData.last_name);

	if (userData.display_name === userDisplayName) {
		LOGGER.info('update-user-display-name', `User with ID "${userId}" already has the correct display name. Skipping update...`);
		return;
	}

	//
	// If the user has at least two accepted sponsor responses,
	// we can consider the user as "active" and send the activation email.

	await payload.update({
		collection: 'users',
		data: {
			display_name: userDisplayName,
		},
		id: userId,
	});

	LOGGER.info('update-user-display-name', `User with ID "${userId}" has been updated with the new display name.`);

	//
};
