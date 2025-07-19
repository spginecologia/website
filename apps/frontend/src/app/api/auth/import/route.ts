/* * */

import payloadConfig from '@/payload-config';
import { type SignupResponse } from '@/payload/collections/Signup/types';
import { type SignupForm, SignupFormValidation } from '@/payload/collections/Signup/validation';
import { getAnonymizedEmail } from '@/utils/get-anonymized-email';
import { payloadGetUser } from '@/utils/payload-get-user';
import { payloadSendSignupEmail } from '@/utils/payload-send-signup-email';
import { DateTime } from 'luxon';
import fs from 'node:fs';
import Papa from 'papaparse';
import { getPayload } from 'payload';
import { User } from 'payload-types';
// import { payloadSendResetPasswordEmail } from '@/utils/payload-send-reset-password-email';

/* * */

export async function GET() {
	try {
		//

		const invalidTaxIds = new Set<string>([]);

		const payload = await getPayload({ config: payloadConfig });

		const usersListTxt = fs.readFileSync('/Users/joao/Developer/spginecologia/website/apps/frontend/app/api/auth/import/data.csv', { encoding: 'utf8' });
		const usersListData = Papa.parse<User>(usersListTxt, { header: true });

		for (const userData of usersListData.data) {
			try {
			//
				// Check if an user already exists with the same email

				const foundUserByEmail = await payloadGetUser(userData.email);
				if (foundUserByEmail) {
					console.log(`User with email ${userData.email} already exists`);
					continue;
				}

				//
				// Check if an user already exists with the same email

				const foundUserByTaxId = await payloadGetUser(userData.tax_id);
				if (foundUserByTaxId) {
					console.log(`User with tax_id ${userData.tax_id} already exists`);
					continue;
				}

				//
				// If no user exists with those credentials,
				// then proceed with creating a new user.

				await payload.create({
					collection: 'users',
					data: {
						account_status: userData.account_status,
						address_1: userData.address_1,
						address_2: userData.address_2,
						birthday: userData.birthday ? DateTime.fromFormat(userData.birthday, 'yyyy-MM-dd').toISO() : null,
						city: userData.city,
						country: userData.country,
						email: userData.email,
						first_name: userData.first_name,
						last_name: userData.last_name,
						medical_id: userData.medical_id,
						password: Math.random().toString(36).slice(0, 20),
						phone: userData.phone,
						postal_code: userData.postal_code,
						send_newsletter: true,
						tax_id: userData.tax_id,
						title: userData.title,
						workplace_primary: userData.workplace_primary,
						workplace_secondary: userData.workplace_secondary,
					},
				});
			}
			catch (error) {
				invalidTaxIds.add(userData.tax_id + '-' + error.message);
				console.error(`User with NIF ${userData.tax_id} has invalid fields:`);
				console.log(error.message);
			}
		}

		// Generate a report of the invalid tax ids

		const invalidTaxIdsReport = Array.from(invalidTaxIds).map((taxId) => {
			return { tax_id: taxId };
		});
		const invalidTaxIdsReportCsv = Papa.unparse(invalidTaxIdsReport, { header: true });
		fs.writeFileSync('/Users/joao/Developer/spginecologia/website/apps/frontend/app/api/auth/import/invalid_tax_ids.csv', invalidTaxIdsReportCsv);
		console.log('Invalid tax ids report generated');
		console.log('Invalid tax ids:', invalidTaxIds);

		//
		// Return a success response

		const response: SignupResponse = { status: 'user_created' };
		return new Response(JSON.stringify(response), { status: 200 });

		//
	}
	catch (err) {
		console.error(err.cause);
		return new Response(err.message, { status: 401 });
	}
}
