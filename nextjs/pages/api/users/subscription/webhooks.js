/* * */

import mongodb from '@/services/mongodb';
import { UserModel } from '@/schemas/User/model';
import STRIPE from '@/services/STRIPE';

/* * */

export const config = { api: { bodyParser: false } };

/* * */

const buffer = (req) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => {
      chunks.push(chunk);
    });
    req.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
    req.on('error', reject);
  });
};

/* * */

export default async function handler(req, res) {
  //

  // 0.
  // Refuse request if not POST

  if (req.method != 'POST') {
    await res.setHeader('Allow', ['POST']);
    return await res.status(405).json({ message: `Method ${req.method} Not Allowed.` });
  }

  // 1.
  // Setup the event variable

  let stripeEvent;

  // 2.
  // Setup the webhook secret

  const stripeWebhookSecret = 'whsec_b8a8e371d04e87f995aef8ec78bd2bcb04779b61bc3499323c19cf66febd62a8';

  // 3.
  // Transform the requst body to buffer and retrieve the request signature

  const requestBody = await buffer(req);
  const requestHeaderSignature = req.headers['stripe-signature'];

  // 4.
  // Verify the event signature

  try {
    if (stripeWebhookSecret) stripeEvent = STRIPE.webhooks.constructEvent(requestBody, requestHeaderSignature, stripeWebhookSecret);
    else throw new Error('No Stripe Webhook Secret configured.');
  } catch (err) {
    console.log('ERROR: Webhook signature verification failed.', err.message);
    return res.status(400).send();
  }

  // 5.
  // Connect to MongoDB

  try {
    await mongodb.connect();
  } catch (err) {
    console.log('ERROR: Failed to connect to MongoDB.', err);
    return await res.status(500).send();
  }

  // 6.
  // Setup the stripe event data variable

  let stripeEventData;

  // 7.
  // Handle webhook events

  switch (stripeEvent.type) {
    //

    // 7.1.
    // A customer was created

    case 'customer.created':
      stripeEventData = stripeEvent.data.object;
      await UserModel.updateOne({ email: { $eq: stripeEventData.email } }, { stripe_customer_id: stripeEventData.id });
      return res.status(200).send();

    // 7.2.
    // A customer was updated

    // case 'customer.updated':
    //   stripeEventData = stripeEvent.data.object;
    //   subscriptionStatus = stripeEventData.status;
    //   console.log('customer.updated', stripeEventData);
    //   return res.status(200).send();

    // 7.3.
    // A customer was deleted

    case 'customer.deleted':
      stripeEventData = stripeEvent.data.object;
      await UserModel.updateOne({ email: { $eq: stripeEventData.email } }, { stripe_customer_id: null, subscription: null });
      return res.status(200).send();

    // 6.3.
    // A subscription was created

    case 'customer.subscription.created':
      stripeEventData = stripeEvent.data.object;
      await UserModel.updateOne(
        { stripe_customer_id: { $eq: stripeEventData.customer } },
        {
          subscription: {
            stripe_subscription_id: stripeEventData.id,
            status: stripeEventData.status,
            created: stripeEventData.created,
            current_period_start: stripeEventData.current_period_start,
            current_period_end: stripeEventData.current_period_end,
          },
        }
      );
      return res.status(200).send();

    // 6.4.
    // A subscription was updated

    case 'customer.subscription.updated':
      stripeEventData = stripeEvent.data.object;
      await UserModel.updateOne(
        { stripe_customer_id: { $eq: stripeEventData.customer } },
        {
          subscription: {
            stripe_subscription_id: stripeEventData.id,
            status: stripeEventData.status,
            created: stripeEventData.created,
            current_period_start: stripeEventData.current_period_start,
            current_period_end: stripeEventData.current_period_end,
          },
        }
      );
      return res.status(200).send();

    //
    default:
      console.log(`Unhandled event type "${stripeEvent.type}"`);
      return res.status(200).send();

    //
  }

  //
}
