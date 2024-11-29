/* * */

import config from '@payload-config';
import { getPayload } from 'payload';
import Stripe from 'stripe';

/* * */

const payload = await getPayload({ config });
const stripeApi = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {});

/* * */

export async function POST(request: Request) {
	try {
		//

		//
		// Get the current logged in user

		const currentUser = await payload.auth({ headers: request.headers });
		if (!currentUser || !currentUser.user) return Response.error();

		//
		// Get all active Stripe Products and Checkout Sessions for this user

		let allActiveStripeProducts: Stripe.ApiList<Stripe.Product>;
		let customerCheckoutSessions: Stripe.ApiList<Stripe.Checkout.Session>;

		try {
			allActiveStripeProducts = await stripeApi.products.list({ active: true, expand: ['data.default_price'] });
		}
		catch (error) {
			console.error('Error fetching active stripe products');
			return Response.error();
		}

		try {
			if ('stripe_id' in currentUser.user) {
				customerCheckoutSessions = await stripeApi.checkout.sessions.list({ customer: currentUser.user.stripe_id ?? '', expand: ['data.line_items'] });
			}
			else {
				console.error('User does not have a stripe_id');
				return Response.error();
			}
		}
		catch (error) {
			console.error('Error fetching customer checkout sessions');
		}

		//
		// For each active price, check if the user has purchased it before

		const priceIdsToInclude = allActiveStripeProducts.data
			.map((activeProduct) => {
				const priceDetails: Stripe.Price = activeProduct.default_price as Stripe.Price;
				if (!priceDetails) return;

				const userHasPurchased = customerCheckoutSessions?.data?.some((checkoutSession) => {
					return checkoutSession.line_items?.data.some(lineItem => lineItem.price?.id === priceDetails.id);
				});

				if (userHasPurchased) {
					return null;
				}
				else {
					return priceDetails.id;
				}
			})
			.filter(priceId => priceId !== null);

		// Create Checkout Sessions from body params.
		const session = await stripeApi.checkout.sessions.create({
			automatic_tax: { enabled: true },
			cancel_url: `${request.headers.get('origin')}/account?canceled=true`,
			customer_creation: 'always',
			customer_email: currentUser.user?.email,
			line_items: priceIdsToInclude.map(priceId => ({ price: priceId, quantity: 1 })),
			mode: 'payment',
			success_url: `${request.headers.get('origin')}/account?success=true`,
		});
		return Response.redirect(session.url ?? '');
	}
	catch (err) {
		console.log(err);
		return Response.error();
	}
}
