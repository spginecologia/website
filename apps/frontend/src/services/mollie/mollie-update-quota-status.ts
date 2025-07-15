/* * */

import payloadConfig from '@/payload-config';
import { mollieIsRefunded } from '@/services/mollie/mollie-is-refunded';
import { MOLLIEAPI } from '@/services/mollie/MOLLIEAPI';
import { vendusCreateCreditNote } from '@/services/vendus/vendus-create-credit-note';
import { vendusCreateInvoice } from '@/services/vendus/vendus-create-invoice';
import { vendusGetClientFromUser } from '@/services/vendus/vendus-get-client-from-user';
import { PaymentStatus } from '@mollie/api-client';
import { getPayload } from 'payload';

/**
 * This function updates the quota status of a user based on their Mollie payment links.
 * It checks the payment status and updates the user's quotas accordingly.
 * It also creates invoices or credit notes in Vendus if necessary.
 * @param userId User ID to update.
 */
export async function mollieUpdateQuotaStatus(userId: string) {
	//

	//
	// Setup payload and fetch the user data

	const payload = await getPayload({ config: payloadConfig });

	const userData = await payload.findByID({
		collection: 'users',
		id: userId,
	});

	if (!userData) {
		throw new Error(`User with ID "${userId}" not found. Skipping...`);
	}

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
			if (paymentData.status === PaymentStatus.canceled) continue;
			if (paymentData.status === PaymentStatus.open) continue;
			if (paymentData.status === PaymentStatus.pending) continue;

			//
			// Check if the payment is paid
			// and if an invoice is already created.

			const isPaid = paymentData.status === PaymentStatus.paid;
			const alreadyHasInvoice = quotaData.invoices?.find(item => item.payment_id === paymentData.id && item.doc_type === 'invoice');

			if (isPaid) {
				// Always set the payment status to 'paid'
				// if the payment was successful. If it was also refunded,
				// this property will be overridden in the next steps.
				quotaData.payment_status = 'paid';
			}

			if (isPaid && !alreadyHasInvoice) {
				// Setup the Vendus client data from the user
				const vendusClientData = vendusGetClientFromUser(userData);
				// Create a new invoice in Vendus
				const newInvoiceData = await vendusCreateInvoice({
					client: vendusClientData,
					external_reference: paymentData.id,
					items: [{
						gross_price: quotaData.payment_amount,
						qty: 1,
						reference: `quota-${quotaData.year}`,
						tax_exemption: 'M07',
						tax_exemption_law: 'Artigo 9.º do CIVA ou similar',
						tax_id: 'ISE',
						title: `Quota for ${quotaData.year}`,
					}],
					type: 'FT',
				});
				// Add the new invoice to the quota item
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
			// Handle the refunded payments

			const isRefunded = mollieIsRefunded(paymentData);
			const alreadyHasCreditNote = quotaData.invoices?.find(item => item.payment_id === paymentData.id && item.doc_type === 'credit_note');

			if (isRefunded) {
				// Override the payment status to 'refunded'
				// if the payment was refunded.
				quotaData.payment_status = 'refunded';
			}

			if (isRefunded && !alreadyHasCreditNote && alreadyHasInvoice) {
				// Create a new credit note in Vendus
				const newCreditNoteData = await vendusCreateCreditNote(alreadyHasInvoice.doc_id);
				// Add the new document to the quota
				quotaData.invoices = [
					{
						doc_id: newCreditNoteData.id,
						doc_number: newCreditNoteData.number,
						doc_system_time: newCreditNoteData.system_time,
						doc_type: 'credit_note',
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
