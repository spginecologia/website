import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
	admin: {
		useAsTitle: 'email',
	},
	auth: true,
	fields: [
		{
			label: 'Título',
			name: 'title',
			options: [
				{ label: 'Sr.', value: 'Sr.' },
				{ label: 'Sr.ª', value: 'Sr.ª' },
				{ label: 'Dr.', value: 'Dr.' },
				{ label: 'Dr.ª', value: 'Dr.ª' },
				{ label: 'Prof.', value: 'Prof.' },
				{ label: 'Prof.ª', value: 'Prof.ª' },
				{ label: 'Exmo.', value: 'Exmo.' },
				{ label: 'Exmo.ª', value: 'Exmo.ª' },
			],
			type: 'select',
		},
		{
			label: 'Nome',
			name: 'name',
			type: 'text',
		},
		{
			label: 'Apelido',
			name: 'last_name',
			type: 'text',
		},
		{
			label: 'Nome Completo',
			name: 'full_name',
			type: 'text',
		},
		{
			label: 'Telefone',
			name: 'cellphone',
			type: 'number',
		},
		{
			label: 'Email',
			name: 'email',
			type: 'text',
		},
		{
			label: 'Número de Sócio SPG',
			name: 'partner_number',
			type: 'number',
		},
		{
			label: 'Número de Contribuinte',
			name: 'tax_number',
			type: 'number',
		},
		{
			label: 'Data de Nascimento',
			name: 'date',
			type: 'date',
		},
		{
			label: 'Local de Trabalho Principal',
			name: 'prime_workplace',
			type: 'text',
		},
		{
			label: 'Local de Trabalho Secundário',
			name: 'secondary_workplace',
			type: 'text',
		},
		{
			fields: [
				{
					label: 'Colposcopia Patologia Tracto Genital Inferior',
					name: 'colposcopia_patologia_tracto_genital_inferior',
					type: 'checkbox',
				},
				{
					label: 'Endoscopia Ginecológica',
					name: 'endoscopia_genecologica',
					type: 'checkbox',
				},
				{
					label: 'Ginecologia Oncológica',
					name: 'ginecologia_oncologica',
					type: 'checkbox',
				},
				{
					label: 'Menopausa',
					name: 'menopausa',
					type: 'checkbox',
				},
				{
					label: 'Uroginecologia',
					name: 'uroginecologia',
					type: 'checkbox',
				},
			],
			type: 'row',
		},
		{
			label: 'Morada',
			name: 'address',
			type: 'text',
		},
		{
			label: 'Morada (Continuação)',
			name: 'address_cont',
			type: 'text',
		},
		{
			label: 'Código Postal',
			name: 'post_code',
			type: 'text',
		},
		{
			label: 'Cidade',
			name: 'city',
			type: 'text',
		},
		{
			defaultValue: 'Portugal',
			label: 'País',
			name: 'country',
			type: 'text',
		},
	],
	slug: 'users',
};
