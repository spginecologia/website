/* * */

import getSession from '@/authentication/getSession';
import prepareApiEndpoint from '@/services/prepareApiEndpoint';
import generator from '@/services/generator';
import { LinkDefault } from '@/schemas/Link/default';
import { LinkModel } from '@/schemas/Link/model';

/* * */

export default async function handler(req, res) {
  //

  // 1.
  // Setup variables

  let sessionData;

  // 2.
  // Get session data

  try {
    sessionData = await getSession(req, res);
  } catch (err) {
    console.log(err);
    return await res.status(400).json({ message: err.message || 'Could not get Session data. Are you logged in?' });
  }

  // 3.
  // Prepare endpoint

  try {
    await prepareApiEndpoint({ request: req, method: 'GET', session: sessionData, permissions: [{ scope: 'links', action: 'create' }] });
  } catch (err) {
    console.log(err);
    return await res.status(400).json({ message: err.message || 'Could not prepare endpoint.' });
  }

  // 2.
  // Save a new document with default values

  try {
    const newDocument = { ...LinkDefault, title: `New Link (${generator({ length: 5, type: 'numeric' })})` };
    while (await LinkModel.exists({ title: newDocument.title })) {
      newDocument.title = `New Link (${generator({ length: 5, type: 'numeric' })})`;
    }
    const createdDocument = await LinkModel(newDocument).save();
    return await res.status(201).json(createdDocument);
  } catch (err) {
    console.log(err);
    return await res.status(500).json({ message: 'Cannot create this Link.' });
  }
}
