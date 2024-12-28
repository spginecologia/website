'use client';

/* * */

import { useField } from '@payloadcms/ui';

/* * */

export default function OpenInvoiceButton({ path }) {
	//

	//
	// A. Fetch data

	const { value: invoiceId } = useField({ path: path.replace('open_pdf', 'invoice_id') });

	//
	// B. Render components

	return (
		<a
			className="btn btn--size-medium btn--style-primary"
			href={`/api/account/payments/get-invoice-pdf/${invoiceId}`}
			style={{ textAlign: 'center' }}
			target="_blank"
		>
			Abrir Fatura em PDF
		</a>
	);

	//
}
