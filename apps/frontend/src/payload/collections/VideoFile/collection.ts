/* * */

import { accessIsActiveUser } from '@/src/utils/access-is-active-user';
import { accessIsAdmin } from '@/src/utils/access-is-admin';
import { getVideoDurationInSeconds } from '@/src/utils/get-video-duration-in-seconds';
import { type CollectionConfig } from 'payload';

/* * */

export const VideoFiles: CollectionConfig = {

	access: {
		create: ({ req }) => {
			const isAdmin = accessIsAdmin({ req });
			const isActiveUser = accessIsActiveUser(req.user?.collection === 'users' ? req.user : null);
			return isAdmin || isActiveUser;
		},
		read: ({ req }) => {
			const isAdmin = accessIsAdmin({ req });
			const isActiveUser = accessIsActiveUser(req.user?.collection === 'users' ? req.user : null);
			return isAdmin || isActiveUser;
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
					req.file.name = `${collection.slug}-${Date.now()}-${req.file.name.replace(/[^a-z0-9.]/gi, '_').slice(-30).toLowerCase()}`;
				}
			},
		],
	},

	slug: 'video-files',

	upload: true,

};
