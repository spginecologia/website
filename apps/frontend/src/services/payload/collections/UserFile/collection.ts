/* * */

import { payloadAccessControl } from '@/services/payload/utils/payload-access-control';
import { type CollectionConfig } from 'payload';

/* * */

export const UserFiles: CollectionConfig = {

	access: {
		create: ({ req }) => {
			return payloadAccessControl('admin', req);
		},
		read: ({ req }) => {
			return payloadAccessControl('admin', req);
		},
	},

	fields: [],

	hooks: {
		beforeOperation: [
			({ collection, operation, req }) => {
				if ((operation === 'create' || operation === 'update') && req.file) {
					req.file.name = `${collection.slug}-${Date.now()}`;
				}
			},
		],
	},

	labels: {
		plural: 'Utilizadores (Ficheiros)',
		singular: 'Utilizador (Ficheiro)',
	},

	slug: 'user-files',

	upload: {
		staticDir: `${process.env.STORAGE_ROOT_DIR}/user-files`,
	},

};
