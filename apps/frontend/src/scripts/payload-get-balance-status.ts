/* * */

import { type User } from 'payload-types';
import { payloadGetActiveProducts } from '@/scripts/payload-get-active-products';
import { type BalanceStatus } from '@/types/payments';

/* * */

export async function payloadGetBalanceStatus(userData: User): Promise<BalanceStatus[]> {
	//

	//
	// Get all active products. This will be the base upon which
	// past payments will be checked against.

	const allActiveProducts = await payloadGetActiveProducts();

	//
	// Build an array of Purchases

	const result: BalanceStatus[] = allActiveProducts.map((productData) => {
		// Check if the current product was purchased
		const wasCurrentProductPurchased = userData.transactions?.some((transactionData) => {
			const matchesCurrentProductId = transactionData.associated_products?.some(associatedProduct => typeof associatedProduct === 'object' && associatedProduct.id === productData.id);
			const transactionIsOfTypeInvoice = transactionData.doc_type === 'invoice';
			return matchesCurrentProductId && transactionIsOfTypeInvoice;
		});
		// Check if the current product was refunded
		const wasCurrentProductRefunded = userData.transactions?.some((transactionData) => {
			const matchesCurrentProductId = transactionData.associated_products?.some(associatedProduct => typeof associatedProduct === 'object' && associatedProduct.id === productData.id);
			const transactionIsOfTypeCreditNote = transactionData.doc_type === 'credit_note';
			return matchesCurrentProductId && transactionIsOfTypeCreditNote;
		});
		// Set the status of the current product
		let currentStatus: BalanceStatus['status'] = 'unpaid';
		if (wasCurrentProductPurchased) currentStatus = 'paid';
		if (wasCurrentProductRefunded) currentStatus = 'refunded';
		// Return the current product status
		return {
			amount: productData.amount,
			id: productData.id,
			status: currentStatus,
			title: productData.title,
		};
	});

	//
	// Return balance status for given user

	return result;

	//
}
