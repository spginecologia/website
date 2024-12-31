/* * */

import Stripe from 'stripe';

/* * */

export const STRIPEAPI = new Stripe(process.env.STRIPE_SECRET_KEY || 'placeholder', {
	apiVersion: '2024-12-18.acacia',
	typescript: true,
});
