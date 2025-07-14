/* * */

import payloadConfig from '@/payload-config';
import { MOLLIEAPI } from '@/services/MOLLIEAPI';
import { PaymentStatus } from '@mollie/api-client';
import { getPayload } from 'payload';
import { type User } from 'payload-types';

import { vendusCreateInvoice } from './vendus-create-invoice';

/**
 * Updates the user's attributes, including newsletter subscription, in Brevo.
 * @param userData User data to be updated in Brevo.
 */
export async function mollieUpdateQuotaStatus(userData: User) {
	//

	//
	// Setup payload to access the database

	const payload = await getPayload({ config: payloadConfig });

	//
	// Check if the user has any quotas and loop through them

	const allUserQuotas = userData.quotas ?? [];

	if (!allUserQuotas.length) {
		console.error(`User NIF "${userData.tax_id}" does not have any quotas. Skipping...`);
		return;
	}

	for (const quotaData of allUserQuotas) {
		//

		//
		// Check if the quota has a Mollie payment link and if it is not paid yet

		if (!quotaData.payment_link_url) {
			console.log(`User NIF "${userData.tax_id}" does not have a payment link for the quota year "${quotaData.year}". Skipping...`);
			continue;
		}

		//
		// Fetch the payment status from Mollie
		// and iterate through the associated payments

		const paymentLinkData = await MOLLIEAPI.paymentLinks.get(quotaData.payment_link_id);

		const associatedPaymentsIterator = paymentLinkData.getPayments();

		for await (const paymentData of associatedPaymentsIterator) {
			//

			//
			// Skip if the payment is expired or failed,
			// as we only want to process either paid or refunded payments.

			if (paymentData.status === PaymentStatus.expired) continue;
			if (paymentData.status === PaymentStatus.failed) continue;

			//
			// Check if the payment is paid or refunded,
			// and if each invoice is already created.

			const isPaid = paymentData.status === PaymentStatus.paid;
			const alreadyHasInvoice = quotaData.invoices?.find(item => item.payment_id === paymentData.id && item.doc_type === 'invoice');

			const isRefunded = paymentData.amountRefunded && paymentData.amountRefunded.value.length > 0;
			const alreadyHasCreditNote = quotaData.invoices?.find(item => item.payment_id === paymentData.id && item.doc_type === 'credit_note');

			if (isPaid && !alreadyHasInvoice) {
				// Create a new invoice in Vendus
				const newInvoiceData = await vendusCreateInvoice({
					external_reference: quotaData.payment_link_id,
					items: [{
						gross_price: quotaData.payment_amount,
						qty: 1,
						reference: `quota-${quotaData.year}`,
						tax_id: 'NOR',
						title: `Quota for ${quotaData.year}`,
					}],
				});
				console.log('newInvoiceData', newInvoiceData);
				// Add the new invoice to the quota
				quotaData.invoices = [
					{
						doc_id: newInvoiceData.id,
						doc_number: newInvoiceData.number,
						doc_system_time: newInvoiceData.system_time,
						doc_type: 'invoice',
						payment_id: paymentData.id,
					},
					...quotaData.invoices || [],
				];
			}

			//
		}

		//
	}

	//
	// Update the user document in the database with the new quota status

	await payload.update({
		collection: 'users',
		data: {
			quotas: allUserQuotas,
		},
		id: userData.id,
	});

	//
}
