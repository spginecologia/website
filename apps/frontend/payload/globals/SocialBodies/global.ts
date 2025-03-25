/* * */

import { spgMemberFieldSet } from '@/payload/fields/spg-member';
import { type GlobalConfig } from 'payload';

/* * */

export const SocialBodies: GlobalConfig = {

	access: {
		read: () => true,
	},

	fields: [
		{
			admin: {
				components: {
					RowLabel: '@/payload/components/SpgMemberRowLabel/index#SpgMemberRowLabel',
				},
				initCollapsed: true,
			},
			fields: spgMemberFieldSet,
			label: 'Membros da Direção',
			labels: {
				plural: 'Membros da Direção',
				singular: 'Membro da Direção',
			},
			name: 'direction',
			type: 'array',
		},
		{
			admin: {
				components: {
					RowLabel: '@/payload/components/SpgMemberRowLabel/index#SpgMemberRowLabel',
				},
				initCollapsed: true,
			},
			fields: spgMemberFieldSet,
			label: 'Membros da Assembleia Geral',
			labels: {
				plural: 'Membros da Assembleia Geral',
				singular: 'Membro da Assembleia Geral',
			},
			name: 'general_assembly',
			type: 'array',
		},
		{
			admin: {
				components: {
					RowLabel: '@/payload/components/SpgMemberRowLabel/index#SpgMemberRowLabel',
				},
				initCollapsed: true,
			},
			fields: spgMemberFieldSet,
			label: 'Membros do Conselho Fiscal',
			labels: {
				plural: 'Membros do Conselho Fiscal',
				singular: 'Membro do Conselho Fiscal',
			},
			name: 'fiscal_council',
			type: 'array',
		},
		{
			admin: {
				components: {
					RowLabel: '@/payload/components/SpgMemberRowLabel/index#SpgMemberRowLabel',
				},
				initCollapsed: true,
			},
			fields: spgMemberFieldSet,
			label: 'Membros do Conselho Consultivo',
			labels: {
				plural: 'Membros do Conselho Consultivo',
				singular: 'Membro do Conselho Consultivo',
			},
			name: 'consultive_council',
			type: 'array',
		},
	],

	label: {
		plural: 'Órgãos Sociais',
		singular: 'Órgãos Sociais',
	},

	slug: 'social-bodies',

};
