/* * */

import Stripe from 'stripe';

/* * */

export const stripeApi = new Stripe(process.env.STRIPE_SECRET_KEY || 'api_key_placeholder', {
	// apiVersion: '2024-11-20.acacia',
	typescript: true,
});
