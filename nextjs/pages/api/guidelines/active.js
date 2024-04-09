/* * */

import getSession from '@/authentication/getSession';
import prepareApiEndpoint from '@/services/prepareApiEndpoint';
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
    await prepareApiEndpoint({ request: req, method: 'GET', session: sessionData, permissions: [{ scope: 'guidelines', action: 'view' }] });
  } catch (err) {
    console.log(err);
    return await res.status(400).json({ message: err.message || 'Could not prepare endpoint.' });
  }

  // 3.
  // List all documents

  try {
    const allDocuments = await GuidelineModel.find({ is_active: true, href: { $exists: true, $ne: '' } });
    const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
    const sortedDocuments = allDocuments.sort((a, b) => collator.compare(a.sort_order, b.sort_order));
    // const featuredSortedDocuments = sortedDocuments.sort((a, b) => collator.compare(b.is_featured, a.is_featured));
    return await res.status(200).send(sortedDocuments);
  } catch (err) {
    console.log(err);
    return await res.status(500).json({ message: 'Cannot list Guidelines.' });
  }

  //
}
