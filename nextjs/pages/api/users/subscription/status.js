/* * */

import checkAuthentication from '@/services/checkAuthentication';
import mongodb from '@/services/mongodb';
import STRIPE from '@/services/STRIPE';
import { UserModel } from '@/schemas/User/model';

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
    await mongodb.connect();
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
  // Check if the user has a stripe_customer_id and retrieve the active subscriptions

  if (userData.stripe_customer_id) {
    const stripeSubscriptions = await STRIPE.subscriptions.list({
      customer: userData.stripe_customer_id,
      status: 'active',
    });
    if (stripeSubscriptions.data.length) {
      userData.subscription = {
        stripe_subscription_id: stripeSubscriptions.data[0].id,
        status: stripeSubscriptions.data[0].status,
        created: stripeSubscriptions.data[0].created,
        current_period_start: stripeSubscriptions.data[0].current_period_start,
        current_period_end: stripeSubscriptions.data[0].current_period_end,
      };
      await userData.save();
    }
  }

  // 7.
  // Redirect user

  return res.send({ status: userData.subscription?.status === 'active' ? true : false });

  //
}
