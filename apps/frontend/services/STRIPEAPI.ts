/* * */

import Stripe from 'stripe';

/* * */

export const STRIPEAPI = new Stripe(process.env.STRIPE_SECRET_KEY || 'placeholder', {
	apiVersion: '2025-03-31.basil',
	typescript: true,
});
