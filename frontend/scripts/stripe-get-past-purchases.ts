/* * */

import { stripeApi } from '@/services/STRIPEAPI';
import { Purchase } from '@/types/payments';
import Stripe from 'stripe';

/* * */

export async function stripeGetPastPurchases(stripeCustomerId: string): Promise<Purchase[]> {
	//

	//
	// Return if no stripeCustomerId is provided

	if (!stripeCustomerId) {
		console.warn('No stripeCustomerId provided to stripeGetPastPurchases()');
		return [];
	}

	//
	// In order to get the customers past purchases from Stripe,
	// and to be able to associate the product IDs for those purchases,
	// it is necessary to perform several requests to Stripe.
	// First, get the customers Checkout Sessions. The session contains
	// the line_items, which contain the price IDs, which represent the products.
	// The session also contains the payment_intent, which in turn
	// contains the possibly several Charge IDs. Then, for the charges,
	// we check if there are any refunds, and if not, we can consider
	// the product as successfully purchased.

	let customerCheckoutSessions: Stripe.ApiList<Stripe.Checkout.Session>;

	try {
		customerCheckoutSessions = await stripeApi.checkout.sessions.list({ customer: stripeCustomerId, expand: ['data.line_items', 'data.payment_intent'] });
	}
	catch (error) {
		throw new Error('Error fetching customer checkout sessions.', error);
	}

	//
	// Now, iterate over the customerCheckoutSessions and check if the
	// user has purchased any products before.

	const purchases: Purchase[] = [];

	if (!customerCheckoutSessions.data?.length) {
		return purchases;
	}

	for (const checkoutSessionData of customerCheckoutSessions.data) {
		//

		//
		// Validate that the checkoutSessionData contains the necessary
		// data to be able to check if the user has purchased the product.

		if (!checkoutSessionData.line_items?.data?.length) continue;

		if (!checkoutSessionData.payment_intent || typeof checkoutSessionData.payment_intent !== 'object') continue;

		//
		// Requet the refunds for this payment intent

		const chargesForThisPaymentIntent = await stripeApi.charges.list({ payment_intent: checkoutSessionData.payment_intent.id });
		const refundsForThisPaymentIntent = await stripeApi.refunds.list({ payment_intent: checkoutSessionData.payment_intent.id });

		//
		// Check if the product has already been paid, is pending, or was refunded

		for (const lineItemData of checkoutSessionData.line_items.data) {
			//

			if (!lineItemData.price) continue;

			//
			// Build the purchase object

			const purchaseData: Purchase = {
				amount: lineItemData.price.unit_amount ?? -1,
				price_id: lineItemData.price.id,
				price_name: lineItemData.description ?? 'sem nome',
				status: 'unpaid',
				timestamp: checkoutSessionData.payment_intent.created,
				vendus_invoice_id: '',
			};

			//
			// Define the purchase status

			const hasOnlyPaidCharges = chargesForThisPaymentIntent.data.filter(charge => charge.paid && !charge.refunded);
			const hasAnyPendingCharge = chargesForThisPaymentIntent.data.find(charge => charge.status === 'pending');
			const paymentIntentHasPendingRefund = refundsForThisPaymentIntent.data.find(refund => refund.status === 'pending');
			const paymentIntentHasSuccessfullRefund = refundsForThisPaymentIntent.data.find(refund => refund.status === 'succeeded');

			if (hasOnlyPaidCharges.length === chargesForThisPaymentIntent.data.length) {
				purchaseData.status = 'paid';
			}
			else if (hasAnyPendingCharge || paymentIntentHasPendingRefund) {
				purchaseData.status = 'pending';
			}
			else if (paymentIntentHasSuccessfullRefund) {
				purchaseData.status = 'refunded';
			}

			//
			// Get the invoice ID from the payment intent

			if (checkoutSessionData.payment_intent.metadata) {
				purchaseData.vendus_invoice_id = checkoutSessionData.payment_intent.metadata.vendus_invoice_id;
			}

			//
			// Add the purchase to the list

			purchases.push(purchaseData);

			//
		}

		//
	}

	//

	return purchases;

	//
}
