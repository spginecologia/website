/* * */

import { type CollectionConfig } from 'payload';

/* * */

export const CourseFiles: CollectionConfig = {

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
		plural: 'Curso (Ficheiros)',
		singular: 'Curso (Ficheiro)',
	},

	slug: 'course-files',

	upload: {
		staticDir: `${process.env.STORAGE_ROOT_DIR}/course-files`,
	},

};
