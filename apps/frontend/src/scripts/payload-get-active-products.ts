/* * */

import { type Product } from '@/payload-types';
import payloadConfig from '@/payload-config';
import { getPayload } from 'payload';

/* * */

export async function payloadGetActiveProducts(): Promise<Product[]> {
	//

	const payload = await getPayload({ config: payloadConfig });

	try {
		const foundActiveProducts = await payload.find({
			collection: 'products',
			pagination: false,
			where: {
				is_enabled: {
					equals: true,
				},
			},
		});
		return foundActiveProducts.docs;
	}
	catch (error) {
		console.error('Error fetching active products', error);
		throw new Error('Error fetching active products');
	}

	//
}
