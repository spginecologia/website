/* * */

import { stripeGetActiveProducts } from '@/src/scripts/stripe-get-active-products';
import { stripeGetPastPurchases } from '@/src/scripts/stripe-get-past-purchases';
import { Purchase } from '@/src/types/payments';

/**
 * To return the balance status, we need to fetch the active products
 * as well as the customer's past purchases. With this information,
 * combine both arrays into a single array of Purchases, allowing us
 * to say, for each active product, if the user has purchased it before or not
 * alongside the user's purchase history.
 *
 * @param stripeCustomerId The Stripe customer ID. When not provided, the function will return only the active products.
 * @returns An array of Purchase items
 */
export async function stripeGetBalanceStatus(stripeCustomerId?: null | string): Promise<Purchase[]> {
	//

	//
	// Start by fetching the active stripe products and validate if the customer ID is provided.
	// If the customer ID is not provided, then an array of only active products will be returned.

	let activeProducts: Purchase[] = [];
	let customerPastPurchases: Purchase[] = [];

	try {
		activeProducts = await stripeGetActiveProducts();
		if (stripeCustomerId) {
			customerPastPurchases = await stripeGetPastPurchases(stripeCustomerId);
		}
	}
	catch (error) {
		console.error('Error fetching active stripe products', error);
		throw new Error('Error fetching active stripe products');
	}

	//
	// The goal here is to combine both arrays into a single array of Purchases

	const balanceStatus = new Map<string, Purchase>();

	activeProducts.forEach((activeProduct) => {
		balanceStatus.set(activeProduct.price_id, {
			amount: activeProduct.amount,
			price_id: activeProduct.price_id,
			price_name: activeProduct.price_name,
			status: activeProduct.status,
		});
	});

	customerPastPurchases?.forEach((purchaseData) => {
		// We will always overwrite the balanceStatus with the latest purchase data
		// to preserve historical data for the user (e.g. price paid or name of the product).
		balanceStatus.set(purchaseData.price_id, purchaseData);
	});

	return Array.from(balanceStatus.values());

	//
}
