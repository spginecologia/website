/* * */

import { STRIPEAPI } from '@/src/services/STRIPEAPI';
import { Purchase } from '@/src/types/payments';

/* * */

export async function stripeGetActiveProducts(): Promise<Purchase[]> {
	//

	const activeProducts: Purchase[] = [];

	try {
		const stripeProducts = await STRIPEAPI.products.list({ active: true, expand: ['data.default_price'] });
		if (!stripeProducts.data) return activeProducts;
		stripeProducts.data.forEach((stripeProduct) => {
			if (!stripeProduct.default_price || typeof stripeProduct.default_price !== 'object') return;
			activeProducts.push({
				amount: stripeProduct.default_price?.unit_amount ?? -1,
				price_id: stripeProduct.default_price.id,
				price_name: stripeProduct.name,
				status: 'unpaid',
			});
		});
	}
	catch (error) {
		console.error('Error fetching active stripe products', error);
		throw new Error('Error fetching active stripe products');
	}

	//

	return activeProducts;

	//
}
