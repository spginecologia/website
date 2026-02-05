/* * */

import { type CollectionConfig } from 'payload';

/* * */

export const Documents: CollectionConfig = {

	access: {
		create: () => true,
		read: () => true,
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
		plural: 'Documentos',
		singular: 'Documento',
	},

	slug: 'documents',

	upload: {
		staticDir: `${process.env.STORAGE_ROOT_DIR}/documents`,
	},

};
