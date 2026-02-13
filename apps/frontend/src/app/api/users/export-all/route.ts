/* * */

import payloadConfig from '@/payload-config';
import { payloadParseUserForExport } from '@/services/payload/collections/User/utils/payload-parse-user-export';
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
		});

		//
		// Strip sensitive fields before exporting

		const sanitizedDocs: Record<string, boolean | null | number | string | undefined>[] = foundUsers.docs.map(payloadParseUserForExport);

		//
		// Convert to CSV and return the response

		const csvData = Papa.unparse(sanitizedDocs, { header: true });
		const filename = `users-export-all-${Date.now()}.csv`;

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
