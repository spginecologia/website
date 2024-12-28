/* * */

import { vendusCreateInvoice, VendusTransactionClient, VendusTransactionItem } from '@/scripts/vendus-create-invoice';
import payloadConfig from '@payload-config';
import { getPayload } from 'payload';
import Stripe from 'stripe';

/* * */

export const config = { api: { bodyParser: false } };

/* * */

export async function POST(request: Request) {
	try {
		//

		const payload = await getPayload({ config: payloadConfig });
		const stripeApi = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {});

		//
		// Extract the webhook event from the request and verify the event
		// by passing the raw request and the stripe signature to the constructEvent function.

		let event: Stripe.Event;

		try {
			const stripeSignature = request.headers.get('stripe-signature');
			if (!stripeSignature) throw new Error('No stripe signature');
			const rawBody = await request.text();
			event = stripeApi.webhooks.constructEvent(rawBody, stripeSignature, process.env.STRIPE_WEBHOOKS_ENDPOINT_SECRET ?? '');
		}
		catch (err) {
			console.log(err);
			return Response.error();
		}

		//
		// Handle the "checkout.session.completed" event.
		// This associates the Stripe customer ID with the website user,
		// allowing the website to display the user's purchase history.

		if (event.type === 'checkout.session.completed') {
			// Ensure the event has a user ID
			const userId = event.data.object.client_reference_id;
			if (!userId) throw new Error('Event has no user ID');
			// Find the user in the database
			const userData = await payload.findByID({ collection: 'users', id: userId });
			if (!userData) throw new Error('User not found');
			// Update the user's Stripe ID
			if (!event.data.object.customer) throw new Error('Event has no customer ID');
			await payload.update({
				collection: 'users',
				data: {
					stripe_id: event.data.object.customer.toString(),
				},
				id: userData.id,
			});
			// console.log('checkout.session.completed', event);
			return Response.json({ received: true });
		}

		//
		// Handle the "charge.succeeded" event.
		// This verifies the charge was successfull and the transaction was paid,
		// triggering an invoice generation and email notification.

		if (event.type === 'charge.succeeded') {
			// Ensure the charge was paid
			if (event.data.object.paid !== true) throw new Error('Charge is not paid');
			// Ensure it is not a refund
			if (event.data.object.refunded !== false) throw new Error('Charge is a refund');
			// // Ensure status is 'succeeded'
			// if (event.data.object.status === 'succeeded') throw new Error('Charge status is not "succeeded"');
			// Ensure charge has a payment intent ID
			if (typeof event.data.object.payment_intent !== 'string') throw new Error('Charge has no payment intent ID or payment intent ID is not a string');
			// Ensure charge has a customer ID
			if (typeof event.data.object.customer !== 'string') throw new Error('Charge has no customer ID or customer ID is not a string');
			// Fetch corresponding checkout session
			const foundCheckoutSessions = await stripeApi.checkout.sessions.list({ expand: ['data.line_items'], payment_intent: event.data.object.payment_intent });
			if (!foundCheckoutSessions || !foundCheckoutSessions.data.length) throw new Error('No checkout session found for payment intent');
			if (foundCheckoutSessions.data.length > 1) throw new Error('Multiple checkout sessions found for payment intent');
			if (!foundCheckoutSessions.data[0].line_items) throw new Error('Checkout session has no line items');
			// Fetch stripe customer details
			const stripeCustomerData = await stripeApi.customers.retrieve(event.data.object.customer);
			if (!stripeCustomerData || stripeCustomerData.deleted) throw new Error('Stripe customer not found or is deleted');
			if (!stripeCustomerData.email) throw new Error('Stripe customer has no email');
			// Find the user in the payload database
			const payloadResponse = await payload.find({ collection: 'users', where: { email: { equals: stripeCustomerData.email } } });
			if (!payloadResponse || !payloadResponse.docs.length) throw new Error(`User not found for email: ${stripeCustomerData.email}`);
			const userData = payloadResponse.docs[0];
			// Prepare transaction client
			const transactionClient: VendusTransactionClient = {
				address: `${userData.billing_address_1 || userData.address_1 || ''} ${userData.billing_address_2 || userData.address_2 || ''}`,
				city: userData.billing_city || userData.city || undefined,
				country: 'PT',
				fiscal_id: (userData.billing_tax_id ? String(userData.billing_tax_id) : undefined) || (userData.tax_id ? String(userData.tax_id) : undefined),
				name: userData.billing_name || userData.full_name || undefined,
				postalcode: userData.billing_postal_code || userData.postal_code || undefined,
			};
			// Prepare transaction items
			const transactionItems: VendusTransactionItem[] = foundCheckoutSessions.data[0].line_items.data.map((lineItem) => {
				return {
					gross_price: lineItem.amount_total / 100,
					qty: lineItem.quantity || 1,
					reference: lineItem.id,
					tax_id: 'NOR',
					title: lineItem.description || 'Item',
				};
			});
			// Generate the invoice
			const invoiceData = await vendusCreateInvoice({
				client: transactionClient,
				external_reference: `Charge ID: ${event.data.object.id}`,
				items: transactionItems,
				notes: `Método de pagamento: ${event.data.object.payment_method_details?.type || 'Desconhecido'}`,
			});
			// Save the invoice to the user's account
			await payload.update({
				collection: 'users',
				data: {
					invoices: [
						...userData.invoices || [],
						{
							invoice_date: invoiceData.date,
							invoice_id: invoiceData.id,
							invoice_number: invoiceData.number,
							invoice_system_time: invoiceData.system_time,
						},
					],
				},
				id: userData.id,
			});
			// Acknowledge the event
			return Response.json({ received: true });
		}

		//
		// In all other cases return an error.

		throw new Error(`Unhandled event type: ${event.type}`);

		//
	}
	catch (err) {
		console.log(err.message);
		return Response.json({ received: false });
	}
}
