/* * */

export interface VendusTransactionItem {
	gross_price: number
	qty: number
	reference: string
	tax_id: 'NOR'
	title: string
}

export interface VendusTransactionClient {
	address?: string
	city?: string
	country: 'PT'
	fiscal_id?: string
	name?: string
	postalcode?: string
}

export interface VendusTransaction {
	client?: VendusTransactionClient
	external_reference?: string
	items: VendusTransactionItem[]
	notes?: string
}

interface VendusInvoiceableTransaction extends VendusTransaction {
	mode: 'normal' | 'tests'
	output: 'auto' | 'html' | 'pdf'
	payments: { id: string }[]
	register_id: string
	type: 'FT'
}

interface VendusInvoice {
	date: string
	id: number
	number: string
	system_time: string
}

/* * */

export async function vendusCreateInvoice(transactionData: VendusTransaction): Promise<VendusInvoice> {
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

	const invoiceableTransactionData: VendusInvoiceableTransaction = {
		...transactionData,
		mode: process.env.VENDUS_WORKMODE as VendusInvoiceableTransaction['mode'] || 'tests',
		output: 'auto',
		payments: [{ id: process.env.VENDUS_PAYMENT_ID }],
		register_id: process.env.VENDUS_REGISTER_ID,
		type: 'FT',
	};

	// Remove the client object if it has no fiscal_id
	if (!invoiceableTransactionData.client?.fiscal_id) {
		delete invoiceableTransactionData.client;
	}

	console.log('-----------------------------');
	console.log('invoiceableTransactionData', invoiceableTransactionData);
	console.log('-----------------------------');

	//
	// Send the invoiceable transaction object to the Vendus API
	// and get the invoice object as the response

	try {
		const vendusResponse = await fetch('https://www.vendus.pt/ws/v1.2/documents', {
			body: JSON.stringify(invoiceableTransactionData),
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
