/* * */

import checkAuthentication from '@/services/checkAuthentication';
import MONGOOSE from '@/services/MONGOOSE';
import STRIPE from '@/services/STRIPE';
import { UserModel } from '@/schemas/User/model';

/* * */

// Possible subscription status:
// 'active'    -  The user has an active subscription, paid and not expired.
// 'valid'     -  The user has a canceled subscription that is still valid in the current billing period.
// 'expired'   -  The user had a subscription but it expired and is no longer valid.
// 'not_found' -  No subscription was found for this user, probably a new user who never interacted with Stripe.

/* * */

export default async function handler(req, res) {
  //

  // 0.
  // Refuse request if not GET

  if (req.method != 'GET') {
    await res.setHeader('Allow', ['GET']);
    return await res.status(405).json({ message: `Method ${req.method} Not Allowed.` });
  }

  // 1.
  // Setup the user session variable

  let userSession;

  // 2.
  // Check for correct Authentication and valid Permissions

  try {
    userSession = await checkAuthentication({ req, res });
  } catch (err) {
    console.log(err);
    return await res.status(401).json({ message: err.message || 'Could not verify Authentication.' });
  }

  // 3.
  // Connect to MongoDB

  try {
    await MONGOOSE.connect();
  } catch (err) {
    console.log(err);
    return await res.status(500).json({ message: 'MongoDB connection error.' });
  }

  // 4.
  // Setup the user data variable

  let userData;

  // 5.
  // Fetch the correct document

  try {
    userData = await UserModel.findOne({ _id: { $eq: userSession.user?._id } });
    if (!userData) return await res.status(404).json({ message: `User with _id: ${req.query._id} not found.` });
  } catch (err) {
    console.log(err);
    return await res.status(500).json({ message: 'Cannot fetch this User.' });
  }

  // 6.
  // If the user has no stripe_customer_id, then it does not yet have a subscription

  if (!userData.stripe_customer_id) {
    userData.subscription = {
      stripe_id: null,
      status: 'not_found',
      current_period_end: null,
      canceled_at: null,
    };
    await userData.save();
    return res.send(userData.subscription);
  }

  // 7.
  // If the user does have a stripe_customer_id, then it might have an active subscription.
  // List all the active subscriptions for this user.

  const stripeSubscriptions = await STRIPE.subscriptions.list({
    customer: userData.stripe_customer_id,
    status: 'all',
  });

  // 8.
  // Search for an active subscription in the returned list,
  // and if found, update the user obeject

  const activeSubscription = stripeSubscriptions?.data?.find((subscription) => subscription.status === 'active');
  if (activeSubscription) {
    userData.subscription = {
      stripe_id: activeSubscription.id,
      status: activeSubscription.status,
      current_period_end: activeSubscription.current_period_end,
      canceled_at: activeSubscription.canceled_at,
    };
    await userData.save();
    return res.send(userData.subscription);
  }

  // 9.
  // If no active subscription was found, search for the most recent subscription.
  // Use that as the current status for the user subscription.

  const sortedSubscriptions = stripeSubscriptions?.data?.sort((a, b) => b.created - a.created);
  if (sortedSubscriptions?.length) {
    userData.subscription = {
      stripe_id: sortedSubscriptions[0].id,
      status: sortedSubscriptions[0].status,
      current_period_end: sortedSubscriptions[0].current_period_end,
      canceled_at: sortedSubscriptions[0].canceled_at,
    };
    await userData.save();
    return res.send(userData.subscription);
  }

  // 10.
  // For all other cases, it can be considered that the user does not have a subscription

  userData.subscription = {
    stripe_id: null,
    status: 'not_found',
    current_period_end: null,
    canceled_at: null,
  };
  await userData.save();
  return res.send(userData.subscription);

  //
}
