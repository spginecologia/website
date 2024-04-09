/* * */

import getSession from '@/authentication/getSession';
import prepareApiEndpoint from '@/services/prepareApiEndpoint';
import { GuidelineModel } from '@/schemas/Guideline/model';
import { GuidelineValidation } from '@/schemas/Guideline/validation';

/* * */

export default async function handler(req, res) {
  //

  // 1.
  // Setup variables

  let sessionData;
  let foundDocument;

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
    await prepareApiEndpoint({ request: req, method: 'PUT', session: sessionData, permissions: [{ scope: 'guidelines', action: 'edit' }] });
  } catch (err) {
    console.log(err);
    return await res.status(400).json({ message: err.message || 'Could not prepare endpoint.' });
  }

  // 6.
  // Parse request body into JSON

  try {
    req.body = await JSON.parse(req.body);
  } catch (err) {
    console.log(err);
    await res.status(500).json({ message: 'JSON parse error.' });
    return;
  }

  // 6.
  // Validate req.body against schema

  try {
    req.body = GuidelineValidation.cast(req.body);
  } catch (err) {
    console.log(err);
    return await res.status(400).json({ message: JSON.parse(err.message)[0].message });
  }

  // 8.
  // Retrieve requested document from the database

  try {
    foundDocument = await GuidelineModel.findOne({ _id: { $eq: req.query._id } });
    if (!foundDocument) return await res.status(404).json({ message: `Guideline with _id "${req.query._id}" not found.` });
  } catch (err) {
    console.log(err);
    return await res.status(500).json({ message: 'Guideline not found.' });
  }

  // 9.
  // Check if document is locked

  if (foundDocument.is_locked) {
    return await res.status(423).json({ message: 'Guideline is locked.' });
  }

  // 7.
  // Update the requested document

  try {
    const editedDocument = await GuidelineModel.replaceOne({ _id: { $eq: req.query._id } }, req.body, { new: true });
    if (!editedDocument) return await res.status(404).json({ message: `Guideline with _id: ${req.query._id} not found.` });
    else return await res.status(200).json(editedDocument);
  } catch (err) {
    console.log(err);
    return await res.status(500).json({ message: 'Cannot update this Guideline.' });
  }

  //
}
