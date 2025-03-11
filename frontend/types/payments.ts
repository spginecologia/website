/* * */

export interface Purchase {
	amount: number
	price_id: string
	price_name: string
	status: 'paid' | 'pending' | 'refunded'	| 'unpaid'
	timestamp?: number
	vendus_credit_note_id?: string
	vendus_invoice_id?: string
}

export interface ProductStatus {
	amount: number
	id: string
	status: 'paid' | 'refunded'	| 'unpaid'
	title: string
}
