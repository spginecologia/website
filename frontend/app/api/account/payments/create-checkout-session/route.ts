/* * */

import { stripeGetBalanceStatus } from '@/scripts/stripe-get-balance-status';
import { Purchase } from '@/types/payments';
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
		// Get the current logged in user

		const currentUser = await payload.auth({ headers: request.headers });
		if (!currentUser || !currentUser.user) return Response.error();

		//
		// Get balance status for current user

		let balanceStatus: Purchase[] = [];

		if ('stripe_id' in currentUser.user) {
			balanceStatus = await stripeGetBalanceStatus(currentUser.user.stripe_id);
		}
		else {
			console.error('No stripe_id property in user object');
			return Response.error();
		}

		//
		// Setup the customer creation settings

		const customerOptions: {
			customer?: string
			customer_creation?: 'always'
			customer_email?: string
		} = {};

		const stripeCustomers = await stripeApi.customers.list({ email: currentUser.user.email });

		if (!stripeCustomers.data?.length) {
			delete customerOptions.customer;
			customerOptions.customer_creation = 'always';
			customerOptions.customer_email = currentUser.user.email;
		}
		else if (stripeCustomers.data.length > 1) {
			console.warn('Multiple customers found with the same email address');
			if ('stripe_id' in currentUser.user && currentUser.user.stripe_id) {
				const savedStripeId = currentUser.user.stripe_id;
				const matchingCustomerId = stripeCustomers.data.find(customer => customer.id === savedStripeId);
				if (matchingCustomerId) {
					customerOptions.customer = matchingCustomerId.id;
					delete customerOptions.customer_creation;
					delete customerOptions.customer_email;
				}
				else {
					delete customerOptions.customer;
					customerOptions.customer_creation = 'always';
					customerOptions.customer_email = currentUser.user.email;
				}
			}
		}
		else {
			customerOptions.customer = stripeCustomers.data[0].id;
			delete customerOptions.customer_creation;
			delete customerOptions.customer_email;
		}

		//
		// Filter out the unpaid items and create
		// a Checkout Session to initiate payment.

		const unpaidItems = balanceStatus.filter(item => item.status === 'unpaid');

		const session = await stripeApi.checkout.sessions.create({
			automatic_tax: { enabled: true },
			cancel_url: `${request.headers.get('origin')}/account?canceled=true`,
			client_reference_id: currentUser.user?.id,
			line_items: unpaidItems.map(purchaseItem => ({ price: purchaseItem.price_id, quantity: 1 })),
			mode: 'payment',
			success_url: `${request.headers.get('origin')}/account?success=true`,
			...customerOptions,
		});

		return Response.redirect(session.url ?? '');
	}
	catch (err) {
		console.log(err);
		return Response.error();
	}
}
