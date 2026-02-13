/* * */

import payloadConfig from '@/payload-config';
import { payloadAccessControl } from '@/services/payload/utils/payload-access-control';
import Papa from 'papaparse';
import { getPayload } from 'payload';

/* * */

export async function GET(request: Request) {
	try {
		//

		//
		// Get the Payload instance
		// with the current configuration

		const payload = await getPayload({ config: payloadConfig });

		//
		// Validate the user credentials against
		// Payload Auth and check if they have admin access

		const authResult = await payload.auth({ headers: request.headers });

		const hasAdminAccess = payloadAccessControl('admin', authResult.user);

		if (!hasAdminAccess) return new Response(null, { status: 403 });

		//
		// Fetch all users from the database
		// and prepare the CSV export

		const foundUsers = await payload.find({
			collection: 'users',
			depth: 0,
			limit: 999999,
			where: {
				account_status: {
					equals: 'active',
				},
			},
		});

		//
		// Filter users with unpaid quotas

		const unpaidUsers = foundUsers.docs.filter((user) => {
			const hasUnpaidQuota = user.quotas?.some(quota => quota.payment_status === 'waiting');
			return hasUnpaidQuota;
		});

		//
		// Strip sensitive fields before exporting

		const sanitizedDocs: Record<string, boolean | null | number | string | undefined>[] = unpaidUsers.map(item => ({
			account_role: item.account_role,
			account_status: item.account_status,
			address_1: item.address_1,
			address_2: item.address_2,
			billing_address_1: item.billing_address_1,
			billing_address_2: item.billing_address_2,
			billing_city: item.billing_city,
			billing_name: item.billing_name,
			billing_postal_code: item.billing_postal_code,
			billing_tax_id: item.billing_tax_id,
			birthday: item.birthday,
			city: item.city,
			country: item.country,
			createdAt: item.createdAt,
			email: item.email,
			first_name: item.first_name,
			id: item.id,
			is_intern: item.is_intern,
			last_name: item.last_name,
			medical_id: item.medical_id,
			member_since: item.member_since,
			phone: item.phone,
			postal_code: item.postal_code,
			send_newsletter: item.send_newsletter,
			subscribed_sections: item.subscribed_sections?.join('|'),
			tax_id: item.tax_id,
			title: item.title,
			updatedAt: item.updatedAt,
			workplace_primary: item.workplace_primary,
			workplace_secondary: item.workplace_secondary,
		}));

		//
		// Convert to CSV and return the response

		const csvData = Papa.unparse(sanitizedDocs, { header: true });
		const filename = `users-export-${Date.now()}.csv`;

		return new Response(csvData, {
			headers: {
				'Cache-Control': 'no-store',
				'Content-Disposition': `attachment; filename="${filename}"`,
				'Content-Type': 'text/csv; charset=utf-8',
			},
			status: 200,
		});

		//
	}
	catch (err) {
		console.log(err);
		return Response.error();
	}
}
