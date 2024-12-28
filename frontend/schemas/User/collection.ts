/* * */

import type { CollectionConfig } from 'payload';

import { UserOptions } from '@/schemas/User/options';

/* * */

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
			tabs: [
				{
					fields: [
						{
							label: 'Título',
							name: 'title',
							options: UserOptions.title,
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
							label: 'Data de Nascimento',
							name: 'birthday',
							type: 'date',
						},
					],
					label: 'Referências',
				},
				{
					fields: [
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
					label: 'Contactos',
				},
				{
					fields: [
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
					],
					label: 'Atividade',
				},
				{
					fields: [],
					label: 'Documentos',
				},
				{
					fields: [
						{
							fields: [
								{
									label: 'Nome na Fatura',
									name: 'billing_name',
									type: 'text',
								},
								{
									label: 'Número de Contribuinte (Fatura)',
									name: 'billing_tax_id',
									type: 'number',
								},
							],
							type: 'row',
						},
						{
							label: 'Morada (Fatura)',
							name: 'billing_address_1',
							type: 'text',
						},
						{
							label: 'Morada Cont. (Fatura)',
							name: 'billing_address_2',
							type: 'text',
						},
						{
							fields: [
								{
									label: 'Código Postal (Fatura)',
									name: 'billing_postal_code',
									type: 'text',
								},
								{
									label: 'Cidade (Fatura)',
									name: 'billing_city',
									type: 'text',
								},
							],
							type: 'row',
						},
						{
							access: {
								update: ({ req }) => {
									if (req.user?.email === 'admin@spginecologia.pt') return true;
									return false;
								},
							},
							label: 'Stripe ID',
							name: 'stripe_id',
							type: 'text',
						},
						{
							fields: [
								{
									fields: [
										{
											label: 'Nº da Fatura',
											name: 'invoice_number',
											type: 'text',
										},
										{
											label: 'Data de Emissão',
											name: 'invoice_date',
											type: 'text',
										},
										{
											label: 'ID de Sistema',
											name: 'invoice_id',
											type: 'text',
										},
										{
											label: 'Hora de Sistema',
											name: 'invoice_system_time',
											type: 'text',
										},
									],
									type: 'row',
								},
								{
									admin: {
										components: {
											Field: '@/components/payload/OpenInvoiceButton',
										},
									},
									name: 'open_pdf',
									type: 'ui',
								},
							],
							label: 'Faturas',
							name: 'invoices',
							type: 'array',
						},
					],
					label: 'Faturação',
				},
			],
			type: 'tabs',
		},
		{
			admin: {
				position: 'sidebar',
			},
			defaultValue: 'pending',
			label: 'Estado do Utilizador',
			name: 'account_status',
			options: [
				{ label: 'Ativo', value: 'active' },
				{ label: 'Pendente de Aprovação', value: 'pending' },
			],
			type: 'select',
		},
	],
	slug: 'users',
};
