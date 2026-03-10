/* * */

import payloadConfig from '@/payload-config';
import { LOGGER } from '@/services/logger/LOGGER';
import { type SignupForm } from '@/services/payload/collections/Signup/validation';
import { getUserDisplayName } from '@/services/payload/collections/User/utils/get-user-display-name';
import { renderAccountSignupTemplate } from '@spginecologia/website-emails';
import { getPayload } from 'payload';

/**
 * Creates a new user with the "affiliate" enrolment type based on the provided signup form data.
 * The new user will have a pending account status until they are approved by an admin.
 * @param signupData The signup data of the user to create.
 * @throws An error if the user creation fails.
 */
export async function createUserAffiliate(signupFormData: SignupForm) {
	//

	const payload = await getPayload({ config: payloadConfig });

	//
	// Skip if the user already has an enrolment approval date.
	// This means the user has already been approved
	// and the activation email has already been sent.

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
			enrolment_curriculum: signupFormData.enrolment_curriculum,
			enrolment_signup_date: new Date().toISOString(),
			enrolment_sponsors: [],
			enrolment_type: 'affiliate',
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

	LOGGER.info('create-user-affiliate', `User with Tax ID "${newUserData.tax_id}" has been created with "affiliate" enrolment type.`);

	//
	// Send the signup confirmation email to the user.

	const templateData = await renderAccountSignupTemplate({
		userDisplayName: getUserDisplayName(newUserData.title, newUserData.first_name),
	});

	await payload.sendEmail({
		html: templateData.html,
		subject: templateData.subject,
		to: newUserData.email,
	});

	LOGGER.info('create-user-affiliate', `Signup Confirmation Email sent to: ${newUserData.email} for user with Tax ID "${newUserData.tax_id}".`);

	//
};
