/* * */

import { accessIsAdmin } from '@/utils/access-is-admin';
import { type CollectionConfig } from 'payload';

/* * */

export const InternalDocuments: CollectionConfig = {

	access: {
		create: ({ req }) => {
			return accessIsAdmin({ req });
		},
		read: ({ req }) => {
			return accessIsAdmin({ req });
		},
	},

	fields: [],

	hooks: {
		beforeOperation: [
			({ collection, operation, req }) => {
				if ((operation === 'create' || operation === 'update') && req.file) {
					req.file.name = `${collection.slug}-${Date.now()}-${req.file.name.replace(/[^a-z0-9.]/gi, '_').slice(-30).toLowerCase()}`;
				}
			},
		],
	},

	labels: {
		plural: 'Documentos Internos',
		singular: 'Documento Interno',
	},

	slug: 'internal-documents',

	upload: true,

};
