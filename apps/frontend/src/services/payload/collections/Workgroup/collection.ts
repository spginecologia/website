/* * */

import { featuredImageField } from '@/services/payload/fields/featured-image';
import { fileOrUrlFieldSet } from '@/services/payload/fields/file-or-url';
import { spgMemberFieldSet } from '@/services/payload/fields/spg-member';
import { topicsField } from '@/services/payload/fields/topics';
import { type CollectionConfig } from 'payload';

/* * */

export const Workgroups: CollectionConfig = {
	access: {
		read: () => true,
	},
	admin: {
		useAsTitle: 'title',
	},
	fields: [
		{
			label: 'Título',
			name: 'title',
			required: true,
			type: 'text',
		},
		{
			label: 'Frase de Apresentação',
			name: 'intro_text',
			required: true,
			type: 'text',
		},
		{
			fields: [
				{
					label: 'O nosso projeto',
					name: 'project_description',
					required: true,
					type: 'textarea',
				},
				{
					label: 'Para onde vamos',
					name: 'goal_description',
					required: true,
					type: 'textarea',
				},
			],
			type: 'row',
		},
		{
			admin: {
				components: {
					RowLabel: '@/services/payload/components/SpgMemberRowLabel/index#SpgMemberRowLabel',
				},
				initCollapsed: true,
			},
			fields: spgMemberFieldSet,
			label: 'Órgãos Sociais',
			labels: {
				plural: 'Órgãos Sociais',
				singular: 'Órgão Social',
			},
			name: 'social_bodies',
			type: 'array',
		},
		{
			admin: {
				components: {
					RowLabel: '@/services/payload/components/FileOrUrlRowLabel/index#FileOrUrlRowLabel',
				},
				initCollapsed: true,
			},
			fields: fileOrUrlFieldSet,
			label: 'Links Úteis',
			labels: {
				plural: 'Links Úteis',
				singular: 'Link Útil',
			},
			name: 'useful_links',
			type: 'array',
		},
		{
			admin: {
				position: 'sidebar',
			},
			label: 'Abreviatura (slug)',
			name: 'slug',
			required: true,
			type: 'text',
		},
		topicsField,
		featuredImageField,
	],
	labels: {
		plural: 'Núcleos',
		singular: 'Núcleo',
	},
	slug: 'workgroups',
};
