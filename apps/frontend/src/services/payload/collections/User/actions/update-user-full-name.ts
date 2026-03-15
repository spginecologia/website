/* * */

import payloadConfig from '@/payload-config';
import { LOGGER } from '@/services/logger/LOGGER';
import { getUserDisplayName } from '@/services/payload/collections/User/utils/get-user-display-name';
import { getPayload } from 'payload';

/**
 * This function updates the user's full name
 * based on their title, first name, and last name.
 * @param userId The ID of the user to update.
 * @throws Error if the user is not found or if there is an error during the update process.
 */
export async function updateUserFullName(userId: string) {
	//

	const payload = await getPayload({ config: payloadConfig });

	//
	// Fetch the requested User data

	const userData = await payload.findByID({
		collection: 'users',
		id: userId,
	});

	if (!userData) {
		LOGGER.error('update-user-full-name', `User with ID "${userId}" not found. Skipping...`);
		return;
	}

	//
	// Calculate the user's full name based
	// on their title, first name, and last name.

	const userFullName = getUserDisplayName(userData.title, userData.first_name, userData.last_name);

	if (userData.full_name === userFullName) {
		LOGGER.info('update-user-full-name', `User with ID "${userId}" already has the correct full name. Skipping update...`);
		return;
	}

	//
	// Update the user's full name in the database.

	await payload.update({
		collection: 'users',
		data: {
			full_name: userFullName,
		},
		id: userId,
	});

	LOGGER.info('update-user-full-name', `User with ID "${userId}" has been updated with the new full name.`);

	//
};
