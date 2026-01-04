/* * */

import payloadConfig from '@/payload-config';
import { getUserDisplayName } from '@/services/general/get-user-display-name';
import { getVideoDurationInSeconds } from '@/services/general/get-video-duration-in-seconds';
import { VideoValidationServer } from '@/services/payload/collections/Video/validation';
import { renderVideoSubmitSectionTemplate, renderVideoSubmitUserTemplate } from '@spginecologia/website-emails';
import { getPayload } from 'payload';

/* * */

export async function POST(request: Request) {
	try {
		//

		const payload = await getPayload({ config: payloadConfig });

		//
		// Get the current logged in user

		const currentUser = await payload.auth({ headers: request.headers });
		if (!currentUser.user?.id) return new Response(null, { status: 401 });

		const currentUserData = await payload.findByID({ collection: 'users', id: currentUser.user.id });
		if (!currentUserData) return new Response(null, { status: 404 });

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
		// Get the associated Topics data from Payload

		if (!jsonDataValidationResult.topics?.length) {
			return new Response('At least one Topic is required', { status: 400 });
		}

		const existingTopicsResult = await payload.find({
			collection: 'topics',
			limit: jsonDataValidationResult.topics.length,
			where: {
				title: {
					in: jsonDataValidationResult.topics,
				},
			},
		});

		const existingTopicTitles = new Set(existingTopicsResult.docs.map(topic => topic.title));
		const missingTopicTitles = jsonDataValidationResult.topics.filter(title => !existingTopicTitles.has(title));

		const createdTopics = await Promise.all(
			missingTopicTitles.map(title =>
				payload.create({
					collection: 'topics',
					data: { title },
				}),
			),
		);

		const topicIds = [
			...existingTopicsResult.docs.map(topic => topic.id),
			...createdTopics.map(topic => topic.id),
		];

		//
		// Get the associated Section data from Payload

		const foundSections = await payload.find({
			collection: 'sections',
			where: {
				id: {
					equals: jsonDataValidationResult.section,
				},
			},
		});

		const sectionData = foundSections.docs?.pop();

		if (!sectionData) {
			return new Response('Invalid Section', { status: 400 });
		}

		//
		// Create the video document

		const createVideoResult = await payload.create({
			collection: 'videos',
			data: {
				authors: jsonDataValidationResult.authors,
				createdAt: new Date().toISOString(),
				declaration_file: createDeclarationFileResult.id,
				description: jsonDataValidationResult.description,
				featured_image: createFeaturedImageResult.id,
				introduction: jsonDataValidationResult.introduction,
				is_featured: false,
				publishedAt: new Date().toISOString(),
				publisher: currentUser.user.id,
				section: sectionData.id,
				status: 'in_review',
				title: jsonDataValidationResult.title,
				topics: topicIds,
				updatedAt: new Date().toISOString(),
				video_file: createVideoFileResult.id,
				views: 0,
			},
			draft: false,
		});

		console.log('Created video with ID:', createVideoResult.id);

		//
		// Send an email notification to the associated Section contact

		if (sectionData && sectionData.contact_email) {
			// Get the template data
			const videoSubmitSectionTemplateData = await renderVideoSubmitSectionTemplate({
				videoUrl: createVideoResult.id,
			});
			// Send the email
			await payload.sendEmail({
				html: videoSubmitSectionTemplateData.html,
				subject: videoSubmitSectionTemplateData.subject,
				to: sectionData.contact_email,
			});
		}

		//
		// Send an email to the user about the new Video

		const videoSubmitUserTemplateData = await renderVideoSubmitUserTemplate({
			sectionTitle: sectionData?.title ?? 'SPG',
			userDisplayName: getUserDisplayName(currentUserData.title, currentUserData.first_name),
		});

		await payload.sendEmail({
			html: videoSubmitUserTemplateData.html,
			subject: videoSubmitUserTemplateData.subject,
			to: currentUser.user.email,
		});

		//
		// Send the response to the caller

		console.log('Video creation process completed successfully.');

		return Response.json(createVideoResult);

		//
	}
	catch (err) {
		console.log(err);
		return new Response('Internal Server Error', { status: 500 });
	}
}
