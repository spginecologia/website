/* * */

import { sendApprovalEmail } from '@/services/payload/collections/Video/actions/send-approval-email';
import { featuredImageField } from '@/services/payload/fields/featured-image';
import { isFeaturedField } from '@/services/payload/fields/is-featured';
import { publishedAtField } from '@/services/payload/fields/published-at';
import { topicsField } from '@/services/payload/fields/topics';
import { payloadAccessControl } from '@/services/payload/utils/payload-access-control';
import { type CollectionConfig } from 'payload';

/* * */

export const Videos: CollectionConfig = {

	access: {
		create: ({ req }) => {
			return payloadAccessControl('admin', req);
		},
		read: () => true,
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
			relationTo: 'sections',
			required: true,
			type: 'relationship',
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
			label: 'Sócio que Publicou',
			name: 'publisher',
			relationTo: 'users',
			required: true,
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

	hooks: {
		afterChange: [
			sendApprovalEmail,
		],
	},

	labels: {
		plural: 'Videos',
		singular: 'Video',
	},

	slug: 'videos',

};
