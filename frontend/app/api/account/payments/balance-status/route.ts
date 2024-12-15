/* * */

import { stripeGetBalanceStatus } from '@/scripts/stripe-get-balance-status';
import config from '@payload-config';
import { getPayload } from 'payload';

/* * */

const payload = await getPayload({ config });

/* * */

export async function GET(request: Request) {
	try {
		//

		//
		// Get the current logged in user

		const currentUser = await payload.auth({ headers: request.headers });
		if (!currentUser || !currentUser.user) return new Response(null, { status: 400 });

		//
		// Get balance status for current user

		if ('stripe_id' in currentUser.user) {
			const result = await stripeGetBalanceStatus(currentUser.user.stripe_id);
			return Response.json(result);
		}

		console.error('No stripe_id property in user object');
		return new Response(null, { status: 400 });

		//
	}
	catch (err) {
		console.log(err);
		return new Response(null, { status: 400 });
	}
}
