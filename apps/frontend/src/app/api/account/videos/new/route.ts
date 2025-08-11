/* * */

import payloadConfig from '@/payload-config';
import { getVideoDurationInSeconds } from '@/services/general/get-video-duration-in-seconds';
import { VideoValidationServer } from '@/services/payload/collections/Video/validation';
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

		const data = await request.formData();
		if (!data) return new Response(null, { status: 400 });

		//
		// Validate the form JSON data

		const jsonData = data.get('_json_data');

		if (!jsonData || typeof jsonData !== 'string') {
			return new Response('Missing form JSON data', { status: 400 });
		}

		const parsedJsonData = JSON.parse(jsonData);

		const jsonDataValidationResult = VideoValidationServer.parse(parsedJsonData);

		//
		// Create the video file

		const videoFileFormData = data.get('video_file');

		if (!videoFileFormData || !(videoFileFormData instanceof File)) {
			return new Response('Invalid video file', { status: 400 });
		}

		const videoFileArrayBuffer = await videoFileFormData.arrayBuffer();
		const videoFileData = Buffer.from(videoFileArrayBuffer);

		const createVideoFileResult = await payload.create({
			collection: 'video-files',
			data: {
				duration: getVideoDurationInSeconds(videoFileData),
			},
			file: {
				data: videoFileData,
				mimetype: videoFileFormData.type,
				name: videoFileFormData.name,
				size: videoFileFormData.size,
			},
		});

		//
		// Create the declaration file

		const declarationFileFormData = data.get('featured_image');

		if (!declarationFileFormData || !(declarationFileFormData instanceof File)) {
			return new Response('Invalid Featured Image file', { status: 400 });
		}

		const declarationFileArrayBuffer = await declarationFileFormData.arrayBuffer();
		const declarationFileData = Buffer.from(declarationFileArrayBuffer);

		const createDeclarationFileResult = await payload.create({
			collection: 'internal-documents',
			data: {},
			file: {
				data: declarationFileData,
				mimetype: declarationFileFormData.type,
				name: declarationFileFormData.name,
				size: declarationFileFormData.size,
			},
		});

		//
		// Create the Featured Image file

		const featuredImageFormData = data.get('featured_image');

		if (!featuredImageFormData || !(featuredImageFormData instanceof File)) {
			return new Response('Invalid Featured Image file', { status: 400 });
		}

		const featuredImageArrayBuffer = await featuredImageFormData.arrayBuffer();
		const featuredImageData = Buffer.from(featuredImageArrayBuffer);

		const createFeaturedImageResult = await payload.create({
			collection: 'media',
			data: {
				alt: jsonDataValidationResult.title,
			},
			file: {
				data: featuredImageData,
				mimetype: featuredImageFormData.type,
				name: featuredImageFormData.name,
				size: featuredImageFormData.size,
			},
		});

		//
		// Create the video document

		const createVideoResult = await payload.create({
			collection: 'videos',
			data: {
				authors: jsonDataValidationResult.authors,
				createdAt: new Date().toISOString(),
				declaration_file: createDeclarationFileResult.id,
				featured: false,
				featured_image: createFeaturedImageResult.id,
				introduction: jsonDataValidationResult.introduction,
				publisher: currentUser.user.id,
				// @ts-expect-error - There is a mismatch between Payload types and the actual data
				section: jsonDataValidationResult.section,
				status: 'in_review',
				title: jsonDataValidationResult.title,
				topics: jsonDataValidationResult.topics,
				updatedAt: new Date().toISOString(),
				video_file: createVideoFileResult.id,
			},
		});

		//
		// Send a notification to the contact email
		// for the selected SPG section

		console.log('jsonDataValidationResult.section', jsonDataValidationResult.section);

		const foundSections = await payload.find({
			collection: 'sections',
			where: {
				id: {
					equals: jsonDataValidationResult.section,
				},
			},
		});

		if (foundSections?.docs.length === 1 && foundSections.docs[0].contact_email) {
			const sectionContactEmail = foundSections.docs[0].contact_email;
			if (sectionContactEmail) {
				// Send the email with the invoice to the user
				const templateData = await renderQuotaPaymentSuccessTemplate({
					invoiceNumber: newInvoiceData.number,
					paymentAmount: `${quotaData.payment_amount}€`,
					quotaYear: quotaData.year,
					userDisplayName: getUserDisplayName(userData.title, userData.first_name),
				});
				await payload.sendEmail({
					attachments: [{
						content: newInvoiceData.output,
						contentType: 'application/pdf',
						encoding: 'base64',
						filename: `spg-invoice-${newInvoiceData.id}.pdf`,
					}],
					html: templateData.html,
					subject: templateData.subject,
					to: userData.email,
				});
			}
		}

		console.log('sectionContactEmail', sectionData.docs[0]);

		//
		// Send the response to the caller

		return Response.json(createVideoResult);

		//
	}
	catch (err) {
		console.log(err);
		return Response.error();
	}
}
