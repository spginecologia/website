/* * */

import { type VendusFullDocumentResponse } from './types';

/* * */

export async function vendusGetDocumentData(invoiceId: number): Promise<VendusFullDocumentResponse> {
	//

	//
	// Validate environment variables

	if (!process.env.VENDUS_API_KEY) {
		throw new Error('Missing VENDUS_API_KEY environment variable');
	}

	if (!process.env.VENDUS_WORKMODE || !['normal', 'tests'].includes(process.env.VENDUS_WORKMODE)) {
		throw new Error('Missing or invalid VENDUS_WORKMODE environment variable');
	}

	//
	// Ask Vendus API for an existing invoice document.
	// The PDF data is returned as a base64 string in the 'output' property.

	try {
		const vendusResponse = await fetch(`https://www.vendus.pt/ws/v1.2/documents/${invoiceId}?mode=${process.env.VENDUS_WORKMODE}`, {
			headers: {
				'Authorization': 'Basic ' + Buffer.from(process.env.VENDUS_API_KEY).toString('base64'),
				'Content-Type': 'application/json',
			},
			method: 'GET',
		});

		const vendusResponseData = await vendusResponse.json();

		if (vendusResponse.status !== 200) {
			// This is how Vendus API sends errors
			const vendusResponseData = await vendusResponse.json();
			const parsedError = vendusResponseData.errors && vendusResponseData.errors[0]?.message;
			throw new Error(parsedError ?? vendusResponseData.ERROR ?? 'Error requesting Vendus for invoice PDF.');
		}
		// Decode from base64 to binary

		return vendusResponseData as VendusFullDocumentResponse;

		// return pdfData.toString('binary');
	}
	catch (error) {
		throw new Error('Error requesting Vendus for invoice PDF: ' + error);
	}

	//
}
