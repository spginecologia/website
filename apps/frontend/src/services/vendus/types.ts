/* * */

/**
 * This type represents the minimum required
 * data to create a Client in Vendus.
 * Emails are forcefully disabled as this
 * is being handled by our system.
 */
export interface VendusClient {
	address?: string
	city?: string
	country: 'PT'
	fiscal_id: string
	name: string
	postalcode?: string
	send_email: 'no'
}

/**
 * This type represents the minimum required
 * data to create an Item in Vendus. An item is a
 * product or service that can be invoiced or refunded.
 * For Quota payments, which is the case here, we use
 * the tax exemption code `M07 - Artigo 9.º do CIVA ou similar`.
 * @see https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/civa_rep/Pages/iva9.aspx
 */
export interface VendusLineItem {
	gross_price: number
	qty: number
	reference: string
	tax_exemption: 'M07'
	tax_exemption_law: 'Artigo 9.º do CIVA ou similar'
	tax_id: 'ISE'
	title: string
}

/**
 * This type represents the minimum required
 * data to create a Refundable Line Item in Vendus.
 * This is used to create a credit note for a specific
 * line item in an invoice. The `reference_document` field
 * is used to link the credit note to the original invoice.
 */
export interface VendusRefundableLineItem {
	id: number
	qty: number
	reference_document: {
		document_number: string
		document_row: number
	}
}

/**
 * This type represents the minimum required
 * data to create an Invoice in Vendus.
 */
export interface VendusInvoice {

	/**
	 * The client to whom the invoice is issued.
	 * Take note to use the billing details before the
	 * user details, as the user might have a preference
	 * for a different billing client.
	 */
	client: VendusClient

	/**
	 * A unique identifier for the invoice.
	 * This should be set to the ID of the
	 * Mollie Payment (not Payment Link)
	 * that triggered the invoice creation.
	 */
	external_reference: string

	/**
	 * The items to be invoiced.
	 */
	items: VendusLineItem[]

	/**
	 * Any additional notes to be included in the invoice.
	 * Use this field to provide context or details
	 * about the invoice, such as payment metadata.
	 */
	notes?: string

	/**
	 * The invoice type is fixed to 'FT' (Fatura)
	 * because it is required for amounts greater
	 * than `100 €`.
	 */
	type: 'FT'

}

/* * */

/**
 * This type represents the minimum required
 * data to create a Credit Note in Vendus.
 * You need to have the original invoice response data
 * to be able to create a credit note.
 */
export interface VendusCreditNote {

	/**
	 * The list of refundable line items
	 * that are being credited.
	 */
	items: VendusRefundableLineItem[]

	/**
	 * The type is fixed to `NC` (Nota de Crédito)
	 * because it is used to create a credit note.
	 */
	type: 'NC'

}

/* * */

/**
 * This is the response type returned
 * by the Vendus API when creating a document.
 * Only a subset of fields are relevant for our use case.
 */
export interface VendusDocumentResponse {
	// amount_gross: string
	// amount_net: string
	// atcud: string
	date: string
	// date_supply: string
	// hash: string
	id: string
	// local_time: string
	number: string
	// output: string
	// output_data: string
	// qrcode: string
	// qrcode_data: string
	// subtype: string
	system_time: string
	// tax_authority_id: string
	// type: 'NC'
}
