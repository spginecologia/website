/* * */

import { payloadGetActiveQuotas } from '@/scripts/payload-get-active-quotas';
import { stripeGetBalanceStatus } from '@/scripts/stripe-get-balance-status';
import payloadConfig from '@payload-config';
import { getPayload } from 'payload';

/* * */

export async function GET(request: Request) {
	try {
		//

		const payload = await getPayload({ config: payloadConfig });

		//
		// Get the current logged in user

		const currentUser = await payload.auth({ headers: request.headers });
		if (!currentUser || !currentUser.user || currentUser.user.collection !== 'users') {
			return new Response(null, { status: 401 });
		}

		//
		// Get all active quotas. This will be the base upon which
		// past payments will be checked against.

		// const allActiveQuotas = await payloadGetActiveQuotas();

		//
		// Extract all previously purchased quotas from the user object

		// const previouslyPurchasedQuotas = currentUser.user.transactions?.flatMap((invoice) => {
		// 	return invoice.associated_quotas?.map((paidQuota) => {
		// 		if (typeof paidQuota !== 'string') {
		// 			return paidQuota.id;
		// 		}
		// 	});
		// });

		//
		// Build an array of Purchases

		// console.log('previouslyPurchasedQuotas', previouslyPurchasedQuotas);

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
