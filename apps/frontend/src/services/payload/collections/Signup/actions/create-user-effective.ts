/* * */

import payloadConfig from '@/payload-config';
import { LOGGER } from '@/services/logger/LOGGER';
import { navigationGetUrlWithRedirectParam } from '@/services/navigation/navigation-handle-redirect-param';
import { type SignupForm } from '@/services/payload/collections/Signup/validation';
import { getUserDisplayName } from '@/services/payload/collections/User/utils/get-user-display-name';
import { payloadGetUser } from '@/services/payload/utils/payload-get-user';
import { renderSignupEffectiveConfirmationTemplate, renderSignupEffectiveSponsorTemplate } from '@spginecologia/website-emails';
import { getPayload } from 'payload';
import { User } from 'payload-types';

/**
 * Creates a new user with the "effective" enrolment type based on the provided signup form data.
 * The new user will have a pending account status until they are approved by an admin.
 * @param signupData The signup data of the user to create.
 * @throws An error if the user creation fails.
 */
export async function createUserEffective(signupFormData: SignupForm) {
	//

	const payload = await getPayload({ config: payloadConfig });

	//
	// Validate that the user can be created with the "effective" enrolment type
	// by checking the medical_specialty field in the signup form data.

	if (!signupFormData.medical_specialty || signupFormData.medical_specialty !== 'gynecology') {
		throw new Error('Medical specialty must be "gynecology" for users with "effective" enrolment type.');
	}

	//
	// The proponent user must have the minimum count of sponsors with an approval status
	// in order to be created with the "effective" enrolment type.

	const validSponsors: User[] = [];

	for (const sponsorTaxId of signupFormData.enrolment_sponsors ?? []) {
		// Get the sponsor user by their tax ID
		const sponsorUser = await payloadGetUser(sponsorTaxId.tax_id);
		// Check if their account status is "active"
		if (sponsorUser?.account_status !== 'active') continue;
		// If all checks pass, add them to the list of valid sponsors
		validSponsors.push(sponsorUser);
	}

	if (validSponsors.length < 2) {
		throw new Error('At least 2 sponsors with an active account status are required for "effective" enrolment type.');
	}

	//
	// Create the new user with the "effective" enrolment type.

	const newUserData = await payload.create({
		collection: 'users',
		data: {
			account_role: 'member',
			account_status: 'waiting',
			address_1: signupFormData.address_1,
			address_2: signupFormData.address_2,
			billing_address_1: signupFormData.billing_address_1,
			billing_address_2: signupFormData.billing_address_2,
			billing_city: signupFormData.billing_city,
			billing_name: signupFormData.billing_name,
			billing_postal_code: signupFormData.billing_postal_code,
			billing_tax_id: signupFormData.billing_tax_id,
			birthday: signupFormData.birthday || null,
			city: signupFormData.city,
			country: signupFormData.country,
			email: signupFormData.email,
			enrolment_signup_date: new Date().toISOString(),
			enrolment_sponsors: validSponsors.map(sponsor => ({
				request_date: new Date().toISOString(),
				response_date: null,
				response_status: 'waiting',
				sponsor_id: sponsor.id,
			})),
			enrolment_type: 'effective',
			first_name: signupFormData.first_name,
			last_name: signupFormData.last_name,
			medical_id: signupFormData.medical_id,
			password: Math.random().toString(36).slice(0, 20),
			phone: signupFormData.phone,
			postal_code: signupFormData.postal_code,
			send_newsletter: signupFormData.send_newsletter,
			subscribed_sections: signupFormData.subscribed_sections
				? signupFormData.subscribed_sections.filter(
					section =>
						[
							'colposcopia_patologia_tracto_genital_inferior',
							'endoscopia_ginecologica',
							'ginecologia_oncologica',
							'menopausa',
							'uroginecologia',
						].includes(section),
				) as ('colposcopia_patologia_tracto_genital_inferior' | 'endoscopia_ginecologica' | 'ginecologia_oncologica' | 'menopausa' | 'uroginecologia')[]
				: signupFormData.subscribed_sections,
			tax_id: signupFormData.tax_id,
			title: [
				'(nenhum)',
				'Dr.',
				'Dr.ª',
				'Exmo.',
				'Exmo.ª',
				null,
				'Prof.',
				'Prof.ª',
				'Sr.',
				'Sr.ª',
				undefined,
			].includes(signupFormData.title)
				? (signupFormData.title as
				| '(nenhum)'
				| 'Dr.'
				| 'Dr.ª'
				| 'Exmo.'
				| 'Exmo.ª'
				| 'Prof.'
				| 'Prof.ª'
				| 'Sr.'
				| 'Sr.ª'
				| null
				| undefined)
				: '(nenhum)',
			workplace_primary: signupFormData.workplace_primary,
			workplace_secondary: signupFormData.workplace_secondary,
		},
	});

	LOGGER.info('create-user-effective', `User with Tax ID "${newUserData.tax_id}" has been created with "effective" enrolment type.`);

	//
	// Send the signup confirmation email to the user.

	const templateData = await renderSignupEffectiveConfirmationTemplate({
		userDisplayName: getUserDisplayName(newUserData.title, newUserData.first_name),
	});

	await payload.sendEmail({
		html: templateData.html,
		subject: templateData.subject,
		to: newUserData.email,
	});

	LOGGER.info('create-user-effective', `Signup Confirmation Email sent to: ${newUserData.email} for user with Tax ID "${newUserData.tax_id}".`);

	//
	// Send the signup notification email to the sponsors.

	for (const sponsor of validSponsors) {
		const approvalData = newUserData.enrolment_sponsors.find(item => typeof item.sponsor_id === 'string' ? item.sponsor_id === sponsor.id : item.sponsor_id?.id === sponsor.id);
		if (!approvalData) {
			console.log(`No approval data found for sponsor with ID "${sponsor.id}" in new user with Tax ID "${newUserData.tax_id}".`);
			continue;
		}
		const templateData = await renderSignupEffectiveSponsorTemplate({
			signupApprovalUrl: navigationGetUrlWithRedirectParam(`${process.env.NEXT_PUBLIC_URL}/signup-approval?proponent_tax_id=${newUserData.tax_id}&sponsor_tax_id=${sponsor.tax_id}&approval_id=${approvalData.id}`),
			userDisplayName: getUserDisplayName(sponsor.title, sponsor.first_name),
		});

		await payload.sendEmail({
			html: templateData.html,
			subject: `New User Signup - ${getUserDisplayName(newUserData.title, newUserData.first_name)} ${newUserData.last_name}`,
			to: 'spg@joao.earth', // sponsor.email,
		});

		LOGGER.info(
			'create-user-effective',
			`Signup Notification Email sent to Sponsor: ${sponsor.email} for new user with Tax ID "${newUserData.tax_id}".`,
		);
	}

	//
};
