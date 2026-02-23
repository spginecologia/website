/* * */

import payloadConfig from '@/payload-config';
import { LOGGER } from '@/services/logger/LOGGER';
import { MOLLIEAPI } from '@/services/mollie/MOLLIEAPI';
import { getUserDisplayName } from '@/services/payload/collections/User/utils/get-user-display-name';
import { getUserEnrollmentYear } from '@/services/payload/collections/User/utils/get-user-enrollment-year';
import { renderQuotaActivationFreeTemplate, renderQuotaActivationTemplate } from '@spginecologia/website-emails';
import { getPayload } from 'payload';
import { type User } from 'payload-types';

/**
 * This function activates quotas for a user by creating Mollie payment links for each quota.
 * It checks if the user is eligible for each quota based on their enrollment year and internship status.
 * @param userId User ID to activate quotas for.
 * @throws Error if no quotas are found or if the user is not found.
 */
export async function mollieActivateQuotas(userId: string) {
	//

	//
	// Setup payload

	const payload = await getPayload({ config: payloadConfig });

	//
	// Fetch the requested User data
	// and validate if it exists and is active.

	const userData = await payload.findByID({
		collection: 'users',
		id: userId,
	});

	if (!userData) {
		LOGGER.error('mollie-activate-quotas', `User with ID "${userId}" not found. Skipping...`);
		return;
	}

	if (!userData.account_status) {
		LOGGER.error('mollie-activate-quotas', `User with ID "${userId}" does not have an account status set. Skipping...`);
		return;
	}

	if (!['active', 'dormant'].includes(userData.account_status)) {
		LOGGER.info('mollie-activate-quotas', `User with ID "${userId}" is not active. Skipping...`);
		return;
	}

	//
	// Fetch all Quotas and filter
	// them based on the required fields.

	const allQuotasData = await payload.find({
		collection: 'quotas',
	});

	if (!allQuotasData?.docs.length) {
		LOGGER.error('mollie-activate-quotas', 'No quotas found. Skipping...');
		return;
	}

	//
	// Loop through all quotas and validate the required fields.

	for (const quotaData of allQuotasData.docs) {
		//

		//
		// Validate the required fields
		// and check if the quota is enabled

		if (!quotaData.year) {
			LOGGER.error('mollie-activate-quotas', `Quota with ID "${quotaData.id}" does not have a year set. Skipping...`);
			continue;
		}

		if (!quotaData.amount || quotaData.amount <= 0) {
			LOGGER.error('mollie-activate-quotas', `Quota with ID "${quotaData.id}" does not have an amount set or has an invalid amount. Skipping...`);
			continue;
		}

		if (!quotaData.is_enabled) {
			LOGGER.info('mollie-activate-quotas', `Quota with ID "${quotaData.id}" is not enabled. Skipping...`);
			continue;
		}

		//
		// Compare the year this user joined SPG and the year of the quota,
		// as well as if the user already has a quota set for this year.

		const userEnrollmentYear = getUserEnrollmentYear(userData.enrollment_approval_date);

		if (!userEnrollmentYear) {
			LOGGER.error('mollie-activate-quotas', `User with ID "${userId}" does not have an enrollment year. Skipping...`);
			continue;
		}

		if (userEnrollmentYear > quotaData.year) {
			LOGGER.info('mollie-activate-quotas', `User with ID "${userId}" joined in "${userEnrollmentYear}" which is after the quota year "${quotaData.year}". Skipping...`);
			continue;
		}

		if (userData.quotas?.some(item => item.year === quotaData.year)) {
			LOGGER.info('mollie-activate-quotas', `User with ID "${userId}" already has a quota for the year "${quotaData.year}". Skipping...`);
			continue;
		}

		//
		// Now, check if the user is an Intern and if the Internship is active.
		// If yes, the quota is still set however the payment status is set to 'free',
		// and the payment link is set to 'internship' to indicate that it's a free quota.

		if (userData.is_intern === true && userData.intern_since && userData.intern_until && quotaData.year >= userData.intern_since && quotaData.year <= userData.intern_until) {
			//

			LOGGER.info('mollie-activate-quotas', `User with ID "${userId}" is an Intern and the quota year "${quotaData.year}" is inside the internship period (${userData.intern_since} - ${userData.intern_until}). Offering the quota...`);

			//
			// Set the quota as free and update the user data
			// with the new payment link and status.

			const newUserQuotas: User['quotas'] = [
				{
					invoices: [],
					payment_amount: quotaData.amount,
					payment_link_id: 'internship',
					payment_link_url: 'internship',
					payment_status: 'free',
					request_date: new Date().toISOString(),
					year: quotaData.year,
				},
				...userData.quotas ?? [],
			];

			await payload.update({
				collection: 'users',
				data: { quotas: newUserQuotas },
				id: userData.id,
			});

			//
			// Send a notification email to the user
			// informing them about the free quota.

			const templateData = await renderQuotaActivationFreeTemplate({
				accountUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3005'}/account`,
				paymentAmount: `${quotaData.amount}€`,
				quotaYear: quotaData.year,
				userDisplayName: getUserDisplayName(userData.title, userData.first_name),
			});

			await payload.sendEmail({
				html: templateData.html,
				subject: templateData.subject,
				to: userData.email,
			});

			//
			// Continue to the next quota as this one is already handled.

			LOGGER.info('mollie-activate-quotas', `Created PaymentLink for User with ID "${userId}" for the year "${quotaData.year}" as an Intern. Email Sent...`);

			//
			// Set a timeout to avoid overloading the server

			await new Promise(resolve => setTimeout(resolve, 1000));

			continue;

			//
		}

		//
		// At this point, we know that the user is eligible for the quota.
		// Create a new mollie Payment Link for this user.

		const paymentLink = await MOLLIEAPI.paymentLinks.create({
			amount: {
				currency: 'EUR',
				value: `${quotaData.amount}.00`, // Mollie requires the amount as a string
			},
			description: `Quota de Sócio SPG de ${quotaData.year}`,
			redirectUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3005'}/api/account/quotas/refresh-status/${userData.id}`,
			reusable: false,
			webhookUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3005'}/api/account/quotas/refresh-status/${userData.id}`,
		});

		//
		// Update the user with the new payment link and status

		const newUserQuotas: User['quotas'] = [
			{
				invoices: [],
				payment_amount: quotaData.amount,
				payment_link_id: paymentLink.id,
				payment_link_url: paymentLink.getPaymentUrl(),
				payment_status: 'waiting',
				request_date: new Date().toISOString(),
				year: quotaData.year,
			},
			...userData.quotas ?? [],
		];

		await payload.update({
			collection: 'users',
			data: { quotas: newUserQuotas },
			id: userData.id,
		});

		//
		// Send a notification email to the user
		// informing them about the new quota.

		const templateData = await renderQuotaActivationTemplate({
			accountUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3005'}/account`,
			paymentAmount: `${quotaData.amount}€`,
			quotaYear: quotaData.year,
			userDisplayName: getUserDisplayName(userData.title, userData.first_name),
		});

		await payload.sendEmail({
			html: templateData.html,
			subject: templateData.subject,
			to: userData.email,
		});

		LOGGER.info('mollie-activate-quotas', `Created PaymentLink for User with ID "${userId}" for the year "${quotaData.year}". Email Sent...`);

		//
		// Set a timeout to avoid overloading the server

		await new Promise(resolve => setTimeout(resolve, 200));

		//
	}

	//
};
