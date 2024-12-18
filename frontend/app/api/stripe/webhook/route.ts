/* * */

import config from '@payload-config';
import { getPayload } from 'payload';
import Stripe from 'stripe';

/* * */

export async function POST(request: Request) {
	try {
		//

		const payload = await getPayload({ config });
		const stripeApi = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {});

		//
		// Extract the webhook event from the request and verify the event
		// by passing the raw request and the stripe signature to the constructEvent function.

		let event;

		try {
			const stripeSignature = request.headers['stripe-signature'];
			const rawRequest = Buffer.from(request.toString());
			event = stripeApi.webhooks.constructEvent(rawRequest, stripeSignature, process.env.STRIPE_WEBHOOKS_ENDPOINT_SECRET ?? '');
		}
		catch (err) {
			console.log(err);
			Response.error();
		}

		//
		// Handle the "checkout.session.completed" event.
		// This associates the Stripe customer ID with the website user,
		// allowing the website to display the user's purchase history.

		if (event.type === 'checkout.session.completed') {
			const userData = await payload.findByID({ collection: 'users', id: event.data.object.client_reference_id });
			if (!userData) throw new Error('User not found');
			if (!event.data.object.customer) throw new Error('Event has no customer ID');
			await payload.update({
				collection: 'users',
				data: {
					stripe_id: event.data.object.customer,
				},
				id: userData.id,
			});
			console.log('charge.succeeded', event);
			return Response.json({ received: true });
		}
		else {
			console.log(`Unhandled event type ${event.type}`);
		}

		//
		// Acknowledge receipt of the event

		return Response.json({ received: true });

		//
	}
	catch (err) {
		console.log(err);
		return Response.error();
	}
}
