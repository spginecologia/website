/* * */

import { VideoOptions } from '@/services/payload/collections/Video/options';
import { featuredImageField } from '@/services/payload/fields/featured-image';
import { isFeaturedField } from '@/services/payload/fields/is-featured';
import { publishedAtField } from '@/services/payload/fields/published-at';
import { topicsField } from '@/services/payload/fields/topics';
import { payloadIsActiveUser } from '@/services/payload/utils/payload-is-active-user';
import { payloadIsAdmin } from '@/services/payload/utils/payload-is-admin';
import { type CollectionConfig } from 'payload';

/* * */

export const Videos: CollectionConfig = {

	access: {
		create: ({ req }) => {
			const isAdmin = payloadIsAdmin({ req });
			const isActiveUser = payloadIsActiveUser(req.user?.collection === 'users' ? req.user : null);
			return isAdmin || isActiveUser;
		},
		read: ({ req }) => {
			return true;
			// const isAdmin = payloadIsAdmin({ req });
			// const isActiveUser = payloadIsActiveUser(req.user?.collection === 'users' ? req.user : null);
			// return isAdmin || isActiveUser;
		},
	},

	admin: {
		useAsTitle: 'title',
	},

	fields: [
		{
			label: 'Titulo',
			name: 'title',
			// required: true,
			type: 'text',
		},
		{
			defaultValue: 'draft',
			label: 'Estado',
			name: 'status',
			options: [
				{ label: 'Rascunho', value: 'draft' },
				{ label: 'Aguarda Revisão', value: 'in_review' },
				{ label: 'Aprovado', value: 'approved' },
				{ label: 'Rejeitado', value: 'rejected' },
			],
			required: true,
			type: 'select',
		},
		{
			label: 'Ficheiro do Vídeo',
			name: 'video_file',
			relationTo: 'video-files',
			type: 'relationship',
		},
		{
			label: 'Declaração Assinada',
			name: 'declaration_file',
			relationTo: 'internal-documents',
			type: 'relationship',
		},
		{
			label: 'Autores',
			name: 'authors',
			// required: true,
			type: 'text',
		},
		{
			label: 'Área de Interesse',
			name: 'section',
			options: VideoOptions.section,
			// required: true,
			type: 'select',
		},
		{
			label: 'Introdução deste Vídeo',
			name: 'introduction',
			// required: true,
			type: 'textarea',
		},
		{
			label: 'Descrição deste Vídeo',
			name: 'description',
			type: 'textarea',
		},
		{
			label: 'Utilizador que Publicou',
			name: 'publisher',
			relationTo: 'users',
			// required: true,
			type: 'relationship',
		},
		{
			admin: {
				position: 'sidebar',
			},
			defaultValue: 0,
			label: 'Visualizações',
			name: 'views',
			type: 'number',
		},
		isFeaturedField,
		topicsField,
		publishedAtField,
		featuredImageField,
	],

	labels: {
		plural: 'Videos',
		singular: 'Video',
	},

	slug: 'videos',

};
