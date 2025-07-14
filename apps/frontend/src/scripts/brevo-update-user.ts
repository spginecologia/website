/* * */

import { BREVOAPI } from '@/services/BREVOAPI';
import { type User } from 'payload-types';

/**
 * Updates the user's attributes, including newsletter subscription, in Brevo.
 * @param userData User data to be updated in Brevo.
 */
export async function brevoUpdateUser(userData: User, updateBy: 'email' | 'id') {
	//

	//
	// Set the request params

	let requestPath: string | undefined;
	let requestMethod: 'POST' | 'PUT';

	if (updateBy === 'email') {
		// If we use email, then it is possible to use a POST
		// as it will create a new user or update an existing one.
		requestPath = undefined;
		requestMethod = 'POST';
	}
	else if (updateBy === 'id') {
		// If we use id, then we must use a PUT as it will
		// update an existing user. This happens when the user
		// changes their email, for example.
		requestPath = `${userData.id}?identifierType=ext_id`;
		requestMethod = 'PUT';
	}
	else {
		throw new Error('Invalid updateBy parameter. Use "email" or "id".');
	}

	//
	// Send the updated user data to Brevo

	await BREVOAPI({
		data: JSON.stringify({
			attributes: {
				EMAIL: userData.email,
				EXT_ID: userData.id,
				FIRSTNAME: userData.first_name,
				LASTNAME: userData.last_name,
				TITLE: userData.title,
			},
			email: userData.email,
			emailBlacklisted: userData.send_newsletter === false ? true : false,
			updateEnabled: true,
		}),
		method: requestMethod,
		path: requestPath,
		service: 'contacts',
	});

	console.log('Updated user in Brevo:', userData.email, 'by', updateBy);

	//
}
