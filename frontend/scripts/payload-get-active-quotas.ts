/* * */

import { type Quota } from '@/payload-types';
import payloadConfig from '@payload-config';
import { getPayload } from 'payload';

/* * */

export async function payloadGetActiveQuotas(): Promise<Quota[]> {
	//

	const payload = await getPayload({ config: payloadConfig });

	try {
		const foundActiveQuotas = await payload.find({
			collection: 'quotas',
			pagination: false,
			where: {
				is_enabled: {
					equals: true,
				},
			},
		});
		return foundActiveQuotas.docs;
	}
	catch (error) {
		console.error('Error fetching active stripe products', error);
		throw new Error('Error fetching active stripe products');
	}

	//
}
