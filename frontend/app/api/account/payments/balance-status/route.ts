/* * */

import { payloadGetActiveProducts } from '@/scripts/payload-get-active-products';
import { type ProductStatus } from '@/types/payments';
import payloadConfig from '@payload-config';
import { getPayload } from 'payload';

/* * */

export async function GET(request: Request) {
	try {
		//

		const payload = await getPayload({ config: payloadConfig });

		//
		// Get the current logged in user

		const currentUser = await payload.auth({ headers: request.headers });
		if (!currentUser || !currentUser.user || currentUser.user.collection !== 'users') {
			return new Response(null, { status: 401 });
		}

		//
		// Get all active quotas. This will be the base upon which
		// past payments will be checked against.

		const allActiveProducts = await payloadGetActiveProducts();

		const userTransactions = currentUser.user.transactions;

		//
		// Build an array of Purchases

		const result: ProductStatus[] = allActiveProducts.map((productData) => {
			// Check if the current product was purchased
			const wasCurrentProductPurchased = userTransactions?.some((transactionData) => {
				const matchesCurrentProductId = transactionData.associated_products?.some(associatedProduct => typeof associatedProduct === 'object' && associatedProduct.id === productData.id);
				const transactionIsOfTypeInvoice = transactionData.doc_type === 'invoice';
				return matchesCurrentProductId && transactionIsOfTypeInvoice;
			});
			// Check if the current product was refunded
			const wasCurrentProductRefunded = userTransactions?.some((transactionData) => {
				const matchesCurrentProductId = transactionData.associated_products?.some(associatedProduct => typeof associatedProduct === 'object' && associatedProduct.id === productData.id);
				const transactionIsOfTypeCreditNote = transactionData.doc_type === 'credit_note';
				return matchesCurrentProductId && transactionIsOfTypeCreditNote;
			});
			// Set the status of the current product
			let currentStatus: ProductStatus['status'] = 'unpaid';
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
		// Get balance status for current user

		return Response.json(result);

		//
	}
	catch (err) {
		console.log(err);
		return new Response(null, { status: 400 });
	}
}
