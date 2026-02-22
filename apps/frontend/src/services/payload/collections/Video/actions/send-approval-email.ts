/* * */

import payloadConfig from '@/payload-config';
import { getUserDisplayName } from '@/services/payload/collections/User/utils/get-user-display-name';
import { renderVideoApprovalUserTemplate } from '@spginecologia/website-emails';
import { type CollectionAfterChangeHook, getPayload } from 'payload';
import { type Video } from 'payload-types';

/**
 * This function runs after a `video` object is updated.
 * It checks if the `status` has changed, and if so,
 * sends an approval email to the user.
 * @param doc The updated video.
 * @param previousDoc The previous video.
 */
export const sendApprovalEmail: CollectionAfterChangeHook<Video> = async ({ doc, previousDoc }) => {
	//

	//
	// Skip if the video status has not changed

	if (previousDoc.status === doc.status) return;

	//
	// Skip if the new status is not 'approved'

	if (doc.status !== 'approved') return;

	//
	// Setup the Payload instance

	const payload = await getPayload({ config: payloadConfig });

	//
	// Get the data from the User who published the Video

	const userId = typeof doc.publisher === 'string' ? doc.publisher : doc.publisher?.id;

	if (!userId) {
		console.error(`Unable to get User ID for Video ID "${doc.id}"`);
		return;
	}

	const userData = await payload.findByID({ collection: 'users', id: userId });

	if (!userData) {
		console.error(`Unable to get User data for Video ID "${doc.id}"`);
		return;
	}

	//
	// Send the approval email notification to the user

	console.log(`Video ID "${doc.id}" status changed: ${previousDoc.status} -> ${doc.status}. Sending approval email...`);

	const videoApprovalUserTemplateData = await renderVideoApprovalUserTemplate({
		userDisplayName: getUserDisplayName(userData.title, userData.first_name),
		videoTitle: doc.title ?? '',
		videoUrl: `${process.env.NEXT_PUBLIC_URL}/academia/videos/${doc.id}`,
	});

	await payload.sendEmail({
		html: videoApprovalUserTemplateData.html,
		subject: videoApprovalUserTemplateData.subject,
		to: userData.email,
	});

	//
};
