/* * */

import { vendusGetInvoicePdf } from '@/scripts/vendus-get-invoice-pdf';

/* * */

export async function GET(request: Request, { params }: { params: Promise<{ invoice_id: string }> }) {
	try {
		//

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
		return new Response(null, { status: 400 });
	}
}
