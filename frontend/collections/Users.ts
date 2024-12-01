import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
	access: {
		// update: ({ id, req: { user } }) => {
		// 	if (!user || !id) return false;
		// 	if (user.id === id) return true;
		// 	return false;
		// },
	},
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
			name: 'phone',
			type: 'text',
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
			name: 'tax_id',
			type: 'number',
		},
		{
			label: 'Número de Cédula Médica',
			name: 'medical_id',
			type: 'number',
		},
		{
			label: 'Stripe ID',
			name: 'stripe_id',
			type: 'text',
		},
		{
			label: 'Data de Nascimento',
			name: 'birthday',
			type: 'date',
		},
		{
			label: 'Local de Trabalho Principal',
			name: 'workplace_primary',
			type: 'text',
		},
		{
			label: 'Local de Trabalho Secundário',
			name: 'workplace_secondary',
			type: 'text',
		},
		{
			hasMany: true,
			label: 'Áreas de Interesse',
			name: 'subscribed_sections',
			options: [
				{ label: 'Colposcopia Patologia Tracto Genital Inferior', value: 'colposcopia_patologia_tracto_genital_inferior' },
				{ label: 'Endoscopia Ginecológica', value: 'endoscopia_ginecologica' },
				{ label: 'Ginecologia Oncológica', value: 'ginecologia_oncologica' },
				{ label: 'Menopausa', value: 'menopausa' },
				{ label: 'Uroginecologia', value: 'uroginecologia' },
			],
			type: 'select',
		},
		{
			label: 'Morada',
			name: 'address_1',
			type: 'text',
		},
		{
			label: 'Morada (Continuação)',
			name: 'address_2',
			type: 'text',
		},
		{
			label: 'Código Postal',
			name: 'postal_code',
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
