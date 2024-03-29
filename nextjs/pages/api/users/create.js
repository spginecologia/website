/* * */

import getSession from '@/authentication/getSession';
import prepareApiEndpoint from '@/services/prepareApiEndpoint';
import generator from '@/services/generator';
import { UserDefault } from '@/schemas/User/default';
import { UserModel } from '@/schemas/User/model';

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
    await prepareApiEndpoint({ request: req, method: 'GET', session: sessionData, permissions: [{ scope: 'users', action: 'create' }] });
  } catch (err) {
    console.log(err);
    return await res.status(400).json({ message: err.message || 'Could not prepare endpoint.' });
  }

  // 4.
  // Save a new document with default values

  try {
    const newDocument = { ...UserDefault, first_name: `New User (${generator({ length: 5, type: 'numeric' })})` };
    while (await UserModel.exists({ first_name: newDocument.first_name })) {
      newDocument.first_name = `New User (${generator({ length: 5, type: 'numeric' })})`;
    }
    newDocument.display_name = newDocument.first_name;
    newDocument.short_display_name = newDocument.first_name;
    const createdDocument = await UserModel(newDocument).save();
    return await res.status(201).json(createdDocument);
  } catch (err) {
    console.log(err);
    return await res.status(500).json({ message: 'Cannot create this User.' });
  }

  //
}
