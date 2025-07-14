/* * */

import payloadConfig from '@/payload-config';
import { MOLLIEAPI } from '@/services/MOLLIEAPI';
import { getPayload } from 'payload';

/* * */

export async function POST(request: Request) {
	try {
		//

		console.log('POST /api/account/quotas/mollie-webhook');
		console.log(request);

		//
		// This endpoint is called on changes to a Mollie Payment status (not Payment Links).
		// When it is paid, cancelled, refunded, etc. These notifications must be treated
		// as just notifications, and as such we need to fetch the given payment info from Mollie.

		//
	}
	catch (err) {
		console.log(err);
		return new Response(null, { status: 400 });
	}
}
