import { slugField } from '@/fields/slug';
import { CollectionConfig } from 'payload';

const Members: CollectionConfig = {
	slug: 'members',
	labels: {
		singular: 'Membro',
		plural: 'Membros',
	},
	admin: {
		useAsTitle: "name",
	},
	fields: [
		{
			name: 'name',
			label: 'Nome',
			type: 'text',
			required: true,
		},
		{
			name: 'profile_picture',
			label: 'Imagem de Perfil',
			type: 'upload',
			relationTo: 'media',
			required: true,
		},
		{
			type: "row",
			fields: [
				{
					name: 'position',
					label: 'Cargo',
					type: 'text',
				},
				{
					name: 'location',
					label: 'Localização',
					type: 'text',
				},
				{
					name: 'social_body',
					label: 'Órgão Social',
					type: 'select',
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
				}
			]
		},
		slugField()
	]
};

export default Members;