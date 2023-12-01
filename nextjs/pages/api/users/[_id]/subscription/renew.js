/* * */

import delay from '@/services/delay';
import checkAuthentication from '@/services/checkAuthentication';
import mongodb from '@/services/mongodb';
import STRIPE from '@/services/STRIPE';
import { UserModel } from '@/schemas/User/model';

/* * */

export default async function handler(req, res) {
  //
  await delay();

  // 0.
  // Refuse request if not GET

  if (req.method != 'GET') {
    await res.setHeader('Allow', ['GET']);
    return await res.status(405).json({ message: `Method ${req.method} Not Allowed.` });
  }

  // 1.
  // Check for correct Authentication and valid Permissions

  try {
    await checkAuthentication({ scope: 'users', permission: 'view', req, res });
  } catch (err) {
    console.log(err);
    return await res.status(401).json({ message: err.message || 'Could not verify Authentication.' });
  }

  // 2.
  // Connect to MongoDB

  try {
    await mongodb.connect();
  } catch (err) {
    console.log(err);
    return await res.status(500).json({ message: 'MongoDB connection error.' });
  }

  // 3.
  // Fetch the correct document

  let foundDocument;
  try {
    foundDocument = await UserModel.findOne({ _id: { $eq: req.query._id } });
    if (!foundDocument) return await res.status(404).json({ message: `User with _id: ${req.query._id} not found.` });
  } catch (err) {
    console.log(err);
    return await res.status(500).json({ message: 'Cannot fetch this User.' });
  }

  // 4.
  // Create a checkout session

  const checkoutSession = await STRIPE.checkout.sessions.create({
    //
    mode: 'subscription',
    //
    success_url: `http://localhost:3000/account?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:3000/account`,
    //
    customer: foundDocument._id,
    customer_email: foundDocument.email,
    //
    line_items: [
      {
        quantity: 1,
        price: 'price_1JODFuLAEpuD5IbneJw36Rk0',
      },
    ],
    //
  });

  // 5.
  // Redirect user

  res.redirect(checkoutSession.url);

  //
}
