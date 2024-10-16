import { CollectionConfig } from 'payload';

const Members: CollectionConfig = {
	slug: 'members',
	labels: {
		singular: 'Membro',
		plural: 'Membros',
	},
	admin: {
		useAsTitle: "title",
	},
	fields: [
		{
			name: 'title',
			label: 'Título',
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
				}
			]
		}
	]
};

export default Members;