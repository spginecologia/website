/* * */

import payloadConfig from '@/payload-config';
import { MOLLIEAPI } from '@/services/MOLLIEAPI';
import { type CollectionAfterChangeHook } from 'payload';
import { getPayload } from 'payload';
import { type Quota, User } from 'payload-types';

/**
 * This function runs after a `quota` object is updated.
 * When a quota is activated, it is necessary to loop through all Users
 * and create a new mollie Payment Link for each.
 * @param doc The new updated document.
 * @param previousDoc The document before changes.
 */
export const afterActivateQuota: CollectionAfterChangeHook<Quota> = async ({ doc }) => {
	//

	//
	// Check if the quota is enabled and validate the required fields.

	if (!doc.is_enabled) {
		console.log('Quota is not enabled, skipping afterActivateQuota hook.');
		return;
	}

	if (!doc.year) {
		console.error('Quota year is not set, skipping afterActivateQuota hook.');
		return;
	}

	if (!doc.amount && doc.amount !== 0) {
		console.error('Quota amount is not set, skipping afterActivateQuota hook.');
		return;
	}

	if (doc.amount <= 0) {
		console.error('Quota amount must be greater than 0 to generate Payment Links, skipping afterActivateQuota hook.');
		return;
	}

	//
	// Get the Payload instance

	const payload = await getPayload({ config: payloadConfig });

	//
	// Get all Users and loop through them

	const allUsers = await payload.find({ collection: 'users' });

	for (const userData of allUsers.docs) {
		//

		//
		// Compare the year this user joined SPG and the year of the quota,
		// as well as if the user already has a payment for this quota year.

		if (!userData.member_since) {
			console.error(`User NIF "${userData.tax_id}" does not have a member_since year. Skipping...`);
			continue;
		}

		if (userData.member_since > doc.year) {
			console.log(`User NIF "${userData.tax_id}" joined in "${userData.member_since}" which is after the quota year "${doc.year}". Skipping...`);
			continue;
		}

		if (userData.quotas?.some(payment => payment.year === doc.year)) {
			console.log(`User NIF "${userData.tax_id}" already has a payment for the year "${doc.year}". Skipping...`);
			continue;
		}

		//
		// At this point, we know that the user is eligible for the quota.
		// Create a new mollie Payment Link for this user.

		const paymentLink = await MOLLIEAPI.paymentLinks.create({
			amount: {
				currency: 'EUR',
				value: `${doc.amount}.00`, // Mollie requires the amount as a string
			},
			description: `Quota de Sócio SPG de ${doc.year}`,
			reusable: false,
		});

		//
		// Update the user with the new payment link and status

		const newPaymentData: User['quotas'] = [
			{
				invoices: [],
				payment_amount: doc.amount,
				payment_link_id: paymentLink.id,
				payment_link_url: paymentLink.getPaymentUrl(),
				payment_status: 'waiting',
				request_date: new Date().toISOString(),
				year: doc.year,
			},
		];

		await payload.update({
			collection: 'users',
			data: {
				quotas: [...newPaymentData, ...userData.quotas ?? []],
			},
			id: userData.id,
		});

		//
	}

	//
};
