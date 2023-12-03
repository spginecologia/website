/* * */

import delay from '@/services/delay';
import checkAuthentication from '@/services/checkAuthentication';
import mongodb from '@/services/MONGOOSE';
import { TopicDefault } from '@/schemas/Topic/default';
import { TopicModel } from '@/schemas/Topic/model';
import generator from '@/services/generator';

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
    await checkAuthentication({ scope: 'topics', permission: 'create_edit', req, res });
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

  // 2.
  // Save a new document with default values

  try {
    const newDocument = { ...TopicDefault, title: `New Topic (${generator({ length: 5, type: 'numeric' })})` };
    while (await TopicModel.exists({ title: newDocument.title })) {
      newDocument.title = `New Topic (${generator({ length: 5, type: 'numeric' })})`;
    }
    const createdDocument = await TopicModel(newDocument).save();
    return await res.status(201).json(createdDocument);
  } catch (err) {
    console.log(err);
    return await res.status(500).json({ message: 'Cannot create this Topic.' });
  }
}
