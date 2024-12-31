/* * */

import { User } from '@/payload-types';
import { BREVOAPI } from '@/services/BREVOAPI';

/**
 * Updates the user's newsletter subscription in Brevo.
 * @param userData User data to be updated in Brevo.
 */
export async function brevoUpdateNewsletterSubscription(userData: User) {
	await BREVOAPI({
		data: JSON.stringify({
			attributes: {
				EXT_ID: userData.id,
				FIRSTNAME: userData.first_name,
				LASTNAME: userData.last_name,
				TITLE: userData.title,
			},
			email: userData.email,
			emailBlacklisted: userData.send_newsletter === false ? true : false,
			updateEnabled: true,
		}),
		method: 'POST',
		service: 'contacts',
	});
}
