/* * */

import checkAuthentication from '@/services/checkAuthentication';
import MONGOOSE from '@/services/MONGOOSE';
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
    else return await res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    return await res.status(500).json({ message: 'Cannot fetch this User.' });
  }

  //
}
