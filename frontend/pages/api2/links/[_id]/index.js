/* * */

import mongodb from '@/services/MONGOOSE';
import { LinkModel } from '@/schemas/Link/model';

/* * */

export default async function handler(req, res) {
  //

  // 1.
  // Refuse request if not GET

  if (req.method != 'GET') {
    await res.setHeader('Allow', ['GET']);
    return await res.status(405).json({ message: `Method ${req.method} Not Allowed.` });
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
  // Fetch the requested document

  try {
    const foundDocument = await LinkModel.findOne({ _id: { $eq: req.query._id } });
    if (!foundDocument) return await res.status(404).json({ message: `Link with _id: ${req.query._id} not found.` });
    else return await res.status(200).json(foundDocument);
  } catch (err) {
    console.log(err);
    return await res.status(500).json({ message: 'Cannot fetch this Link.' });
  }

  //
}
