/* * */

import payloadConfig from '@/payload-config';
import { UserEditableProfileDefault } from '@/services/payload/collections/User/default';
import { UserEditableProfileValidation } from '@/services/payload/collections/User/validation';
import { mergekit } from 'mergekit';
import { getPayload } from 'payload';

/* * */

export async function POST(request: Request) {
	try {
		//

		const payload = await getPayload({ config: payloadConfig });

		//
		// Get the current logged in user

		const currentUser = await payload.auth({ headers: request.headers });
		if (!currentUser || !currentUser.user) return new Response(null, { status: 401 });

		//
		// Get the form data

		console.log('Form data received:');
		const data = await request.formData();
		if (!data) return new Response(null, { status: 400 });

		//
		// Validate the form data

		const jsonData = data.get('_json_data');

		if (!jsonData || typeof jsonData !== 'string') {
			return new Response('Missing form JSON data', { status: 400 });
		}

		const parsedJsonData = JSON.parse(jsonData);

		const validationResult = UserEditableProfileValidation.parse(parsedJsonData);

		const mergedData = mergekit([validationResult], { onlyKeys: Object.keys(UserEditableProfileDefault) });

		//
		// Create the intern proof file

		const internProofFileFormData = data.get('intern_proof');

		if (internProofFileFormData && (internProofFileFormData instanceof File)) {
			const internProofFileArrayBuffer = await internProofFileFormData.arrayBuffer();
			const internProofFileData = Buffer.from(internProofFileArrayBuffer);
			const createInternProofFileResult = await payload.create({
				collection: 'internal-documents',
				data: {},
				file: {
					data: internProofFileData,
					mimetype: internProofFileFormData.type,
					name: internProofFileFormData.name,
					size: internProofFileFormData.size,
				},
			});
			mergedData.intern_proof = createInternProofFileResult.id;
		}

		//
		// Update the user

		const updateResult = await payload.update({
			collection: 'users',
			data: mergedData,
			id: currentUser.user.id,
		});

		return Response.json(updateResult);

		//
	}
	catch (err) {
		console.log(err.message);
		return new Response(`API route error: ${err.message}`, { status: 500 });
	}
}
