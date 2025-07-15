/* * */

import { type VendusCreditNote, type VendusDocumentResponse } from '@/services/vendus/types';

/**
 * This is the internal type used to create a Credit Note
 * in Vendus. It extends the VendusCreditNote type
 * with additional fields required by the Vendus API.
 */
export interface VendusCreatableCreditNote extends VendusCreditNote {
	mode: 'normal' | 'tests'
	output: 'auto' | 'html' | 'pdf'
	payments: { id: string }[]
	register_id: string
}

/* * */

export async function vendusCreateDocument(transactionData: VendusCreditNote): Promise<VendusDocumentResponse> {
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

	const creatableCreditNoteData: VendusCreatableCreditNote = {
		...transactionData,
		mode: process.env.VENDUS_WORKMODE as VendusCreatableCreditNote['mode'] || 'tests',
		output: 'auto',
		payments: [{ id: process.env.VENDUS_PAYMENT_ID }],
		register_id: process.env.VENDUS_REGISTER_ID,
	};

	console.log('-----------------------------');
	console.log('creatableCreditNoteData', creatableCreditNoteData);
	console.log('-----------------------------');

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
			system_time: vendusResponseData.system_time,
		};
	}
	catch (error) {
		throw new Error('Error requesting Vendus for an invoice: ' + error);
	}

	//
}
