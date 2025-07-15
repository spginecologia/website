/* * */

import { type VendusInvoice, type VendusSimplifiedDocumentResponse } from '@/services/vendus/types';

/**
 * This is the internal type used to create an invoice
 * in Vendus. It extends the VendusInvoice type
 * with additional fields required by the Vendus API.
 */
interface VendusCreatableInvoice extends VendusInvoice {
	mode: 'normal' | 'tests'
	output: 'auto' | 'html' | 'pdf'
	payments: { id: string }[]
	register_id: string
}

/* * */

export async function vendusCreateInvoice(transactionData: VendusInvoice): Promise<VendusSimplifiedDocumentResponse> {
	//

	//
	// Validate environment variables

	if (!process.env.VENDUS_API_KEY) {
		throw new Error('Missing VENDUS_API_KEY environment variable');
	}

	if (!process.env.VENDUS_WORKMODE || !['normal', 'tests'].includes(process.env.VENDUS_WORKMODE)) {
		throw new Error('Missing or invalid VENDUS_WORKMODE environment variable');
	}

	if (!process.env.VENDUS_PAYMENT_ID) {
		throw new Error('Missing VENDUS_PAYMENT_ID environment variable');
	}

	if (!process.env.VENDUS_REGISTER_ID) {
		throw new Error('Missing VENDUS_REGISTER_ID environment variable');
	}

	//
	// Prepare the invoiceable transaction object

	const creatableInvoiceData: VendusCreatableInvoice = {
		...transactionData,
		mode: process.env.VENDUS_WORKMODE as VendusCreatableInvoice['mode'] ?? 'tests',
		output: 'auto',
		payments: [{ id: process.env.VENDUS_PAYMENT_ID }],
		register_id: process.env.VENDUS_REGISTER_ID,
		type: 'FT',
	};

	//
	// Send the invoiceable transaction object to the Vendus API
	// and get the invoice object as the response

	try {
		const vendusResponse = await fetch('https://www.vendus.pt/ws/v1.2/documents', {
			body: JSON.stringify(creatableInvoiceData),
			headers: {
				'Authorization': 'Basic ' + Buffer.from(process.env.VENDUS_API_KEY).toString('base64'),
				'Content-Type': 'application/json',
			},
			method: 'POST',
		});

		const vendusResponseData = await vendusResponse.json();

		if (vendusResponse.status != 201) {
			// This is how Vendus API sends errors
			throw new Error((vendusResponseData.errors && vendusResponseData.errors[0]?.message) || vendusResponseData.ERROR || 'Error requesting Vendus for an invoice.');
		}

		return {
			date: vendusResponseData.date,
			id: vendusResponseData.id,
			number: vendusResponseData.number,
			system_time: vendusResponseData.system_time,
		};
	}
	catch (error) {
		throw new Error('Error requesting Vendus for an invoice: ' + error);
	}

	//
}
