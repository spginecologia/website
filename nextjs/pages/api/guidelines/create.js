/* * */

import getSession from '@/authentication/getSession';
import prepareApiEndpoint from '@/services/prepareApiEndpoint';
import generator from '@/services/generator';
import { GuidelineDefault } from '@/schemas/Guideline/default';
import { GuidelineModel } from '@/schemas/Guideline/model';

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
    await prepareApiEndpoint({ request: req, method: 'GET', session: sessionData, permissions: [{ scope: 'guidelines', action: 'create' }] });
  } catch (err) {
    console.log(err);
    return await res.status(400).json({ message: err.message || 'Could not prepare endpoint.' });
  }

  // 2.
  // Save a new document with default values

  try {
    const newDocument = { ...GuidelineDefault, title: `New Guideline (${generator({ length: 5, type: 'numeric' })})` };
    while (await GuidelineModel.exists({ title: newDocument.title })) {
      newDocument.title = `New Guideline (${generator({ length: 5, type: 'numeric' })})`;
    }
    const createdDocument = await GuidelineModel(newDocument).save();
    return await res.status(201).json(createdDocument);
  } catch (err) {
    console.log(err);
    return await res.status(500).json({ message: 'Cannot create this Guideline.' });
  }
}
