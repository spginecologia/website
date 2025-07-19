/* * */

import { type VendusRefundableLineItem, type VendusSimplifiedDocumentResponse } from '@/services/vendus/types';
import { vendusGetDocumentData } from '@/services/vendus/vendus-get-invoice-data';

/**
 * This is the internal type used
 * to create a Credit Note in Vendus.
 */
export interface VendusCreatableCreditNote {
	items: VendusRefundableLineItem[]
	mode: 'normal' | 'tests'
	notes: string
	output: 'pdf'
	payments: { id: string }[]
	register_id: string
	type: 'NC'
}

/**
 * This function creates a credit note in Vendus based on the original invoice data.
 * It requires the original invoice ID to fetch the necessary data.
 * @param invoiceId The ID of the original invoice to create a credit note for.
 * @returns A promise that resolves to the simplified response from Vendus after creating the credit note.
 * @throws An error if the Vendus API request fails or if required environment variables are missing
 */
export async function vendusCreateCreditNote(invoiceId: number): Promise<VendusSimplifiedDocumentResponse> {
	//

	//
	// Validate params

	if (!invoiceId) {
		throw new Error('Missing invoiceId parameter');
	}

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
	// Fetch the original invoice data from Vendus

	const originalInvoiceData = await vendusGetDocumentData(invoiceId);

	//
	// Prepare the Credit Note object

	const refundableLineItems: VendusRefundableLineItem[] = originalInvoiceData.items.map((item, index) => ({
		id: item.id,
		qty: item.qty,
		reference_document: {
			document_number: originalInvoiceData.number,
			document_row: index + 1,
		},
	}));

	const creatableCreditNoteData: VendusCreatableCreditNote = {
		items: refundableLineItems,
		mode: process.env.VENDUS_WORKMODE as VendusCreatableCreditNote['mode'] ?? 'tests',
		notes: 'Correção de valor.',
		output: 'pdf',
		payments: [{ id: process.env.VENDUS_PAYMENT_ID }],
		register_id: process.env.VENDUS_REGISTER_ID,
		type: 'NC',
	};

	//
	// Send the invoiceable transaction object to the Vendus API
	// and get the invoice object as the response

	try {
		const vendusResponse = await fetch('https://www.vendus.pt/ws/v1.2/documents', {
			body: JSON.stringify(creatableCreditNoteData),
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
			output: vendusResponseData.output,
			system_time: vendusResponseData.system_time,
		};
	}
	catch (error) {
		throw new Error('Error requesting Vendus for an invoice: ' + error);
	}

	//
}
