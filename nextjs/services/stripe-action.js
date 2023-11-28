'use server';

import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

import { formatAmountForStripe } from '@/services/stripe-helpers';
import { stripe } from '@/services/stripe-lib';

export async function createCheckoutSession(data) {
  return 'uidhiudh';
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    submit_type: 'donate',
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'EUR',
          product_data: {
            name: 'Custom amount donation',
          },
          unit_amount: 3000, // formatAmountForStripe(Number(data.get('customDonation')), 'EUR'),
        },
      },
    ],
    success_url: `${headers().get('origin')}/donate-with-checkout/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${headers().get('origin')}/donate-with-checkout`,
  });

  redirect(checkoutSession.url);
}

export async function createPaymentIntent(data) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: formatAmountForStripe(Number(data.get('customDonation')), 'EUR'),
    automatic_payment_methods: { enabled: true },
    currency: 'EUR',
  });

  return { client_secret: paymentIntent.client_secret };
}
