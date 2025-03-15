/* * */

import { payloadGetBalanceStatus } from '@/scripts/payload-get-balance-status';
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
		// Get balance status for current user

		const balanceStatus = await payloadGetBalanceStatus(currentUser.user);

		return Response.json(balanceStatus);

		//
	}
	catch (err) {
		console.log(err);
		return new Response(null, { status: 400 });
	}
}
