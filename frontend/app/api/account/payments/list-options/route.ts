/* * */

import config from '@payload-config';
import { getPayload } from 'payload';
import Stripe from 'stripe';

/* * */

const payload = await getPayload({ config });
const stripeApi = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {});

/* * */

export async function GET(request: Request) {
	try {
		//

		//
		// Get the current logged in user

		const currentUser = await payload.auth({ headers: request.headers });
		if (!currentUser || !currentUser.user) return new Response(null, { status: 400 });

		//
		// Get all active Stripe Products and Checkout Sessions for this user

		let allActiveStripeProducts: Stripe.ApiList<Stripe.Product>;
		let customerCheckoutSessions: Stripe.ApiList<Stripe.Checkout.Session>;

		try {
			allActiveStripeProducts = await stripeApi.products.list({ active: true, expand: ['data.default_price'] });
		}
		catch (error) {
			console.error('Error fetching active stripe products', error);
			return new Response(null, { status: 400 });
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
			console.error('Error fetching customer checkout sessions', error);
			return Response.error();
		}

		//
		// For each active price, check if the user has purchased it before

		const purchaseOptions = allActiveStripeProducts.data?.map((activeProduct) => {
			const priceDetails: Stripe.Price = activeProduct.default_price as Stripe.Price;
			if (!priceDetails) return;

			const userHasPurchased = customerCheckoutSessions?.data?.some((checkoutSession) => {
				return checkoutSession.line_items?.data.some(lineItem => lineItem.price?.id === priceDetails.id);
			});

			return {
				already_paid: userHasPurchased ? true : false,
				price_amount: (priceDetails.unit_amount ?? 0) / 100,
				price_id: priceDetails.id,
				product_name: activeProduct.name,
			};
		});

		return Response.json(purchaseOptions);

		//
	}
	catch (err) {
		console.log(err);
		return Response.error();
	}
}
