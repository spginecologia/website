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
  // List all documents

  try {
    const allDocuments = await LinkModel.find({});
    const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
    const sortedDocuments = allDocuments.sort((a, b) => collator.compare(a.order, b.order));
    return await res.status(200).send(sortedDocuments);
  } catch (err) {
    console.log(err);
    return await res.status(500).json({ message: 'Cannot list Links.' });
  }

  //
}
