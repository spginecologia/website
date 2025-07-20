/* * */

import { type UserQuotaPaymentStatus } from '@/services/payload/collections/User/options';

/* * */

export interface UserQuotaListItem {
	payment_amount: number
	payment_link_id: string
	payment_link_url: string
	payment_status: UserQuotaPaymentStatus
	request_date: string
	year: number
}

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

export interface BalanceStatus {
	amount: number
	id: string
	status: 'paid' | 'refunded'	| 'unpaid'
	title: string
}
