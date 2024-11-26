import { slugField } from '@/fields/slug';
import { CollectionConfig } from 'payload';

const Members: CollectionConfig = {
	admin: {
		useAsTitle: 'name',
	},
	fields: [
		{
			label: 'Nome',
			name: 'name',
			required: true,
			type: 'text',
		},
		{
			label: 'Imagem de Perfil',
			name: 'profile_picture',
			relationTo: 'media',
			required: true,
			type: 'upload',
		},
		{
			fields: [
				{
					label: 'Cargo',
					name: 'position',
					type: 'text',
				},
				{
					label: 'Localização',
					name: 'location',
					type: 'text',
				},
				{
					label: 'Órgão Social',
					name: 'social_body',
					options: [
						{
							label: 'Direção',
							value: 'direcao',
						},
						{
							label: 'Assembleia Geral',
							value: 'assembleia-geral',
						},
						{
							label: 'Conselho Fiscal',
							value: 'conselho-fiscal',
						},
						{
							label: 'Conselho Consultivo',
							value: 'conselho-consultivo',
						},
					],
					type: 'select',
				},
			],
			type: 'row',
		},
		slugField(),
	],
	labels: {
		plural: 'Membros',
		singular: 'Membro',
	},
	slug: 'members',
};

export default Members;
