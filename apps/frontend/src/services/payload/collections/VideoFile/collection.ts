/* * */

import { getVideoDurationInSeconds } from '@/services/general/get-video-duration-in-seconds';
import { payloadAccessControl } from '@/services/payload/utils/payload-access-control';
import { type CollectionConfig } from 'payload';

/* * */

export const VideoFiles: CollectionConfig = {

	access: {
		create: ({ req }) => {
			return payloadAccessControl('admin', req);
		},
		read: ({ req }) => {
			return payloadAccessControl('admin', req);
		},
	},

	fields: [
		{
			name: 'duration',
			type: 'number',
		},
	],

	hooks: {
		beforeOperation: [
			({ args, collection, operation, req }) => {
				if ((operation === 'create' || operation === 'update') && req.file) {
					const videoDuration = req.file.data ? getVideoDurationInSeconds(req.file.data) : null;
					if (videoDuration) args.data.duration = videoDuration;
					req.file.name = `${collection.slug}-${Date.now()}.${req.file.mimetype.split('/')[1]}`;
				}
			},
		],
	},

	labels: {
		plural: 'Videos (Ficheiros)',
		singular: 'Video (Ficheiro)',
	},

	slug: 'video-files',

	upload: {
		staticDir: `${process.env.STORAGE_ROOT_DIR}/video-files`,
	},

};
