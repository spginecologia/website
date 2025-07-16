/* * */

import payloadConfig from '@/payload-config';
import { vendusGetInvoicePdf } from '@/services/vendus/vendus-get-invoice-pdf';
import { redirect } from 'next/navigation';
import { getPayload } from 'payload';

/* * */

export async function GET(request: Request, { params }: { params: Promise<{ invoice_id: string }> }) {
	try {
		//

		const payload = await getPayload({ config: payloadConfig });

		//
		// Get the current logged in user

		const currentUser = await payload.auth({ headers: request.headers });
		if (!currentUser || !currentUser.user) return new Response(null, { status: 401 });

		//
		// Get the invoice ID from the request query

		const invoiceId = (await params).invoice_id;

		if (!invoiceId || typeof invoiceId !== 'string') return new Response(null, { status: 400 });

		//
		// Get the invoice PDF from the Vendus API

		const invoicePdf = await vendusGetInvoicePdf(invoiceId);

		//
		// Return the invoice PDF data as a response

		return new Response(invoicePdf, {
			headers: {
				'Content-Disposition': `inline; filename="invoice-${invoiceId}.pdf"`,
				'Content-Type': 'application/pdf',
			},
		});

		//
	}
	catch (err) {
		console.log(err);
		redirect('/error');
	}
}
