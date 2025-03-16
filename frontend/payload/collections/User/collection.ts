/* * */

import { afterChangeUser } from '@/payload/collections/User/actions';
import { UserOptions } from '@/payload/collections/User/options';
import { validateTaxId } from '@/utils/validate-tax-id';
import { type CollectionConfig } from 'payload';

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

	auth: {

		cookies: {
			domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
			sameSite: 'Strict',
			secure: true,
		},

		// This is being handled by the custom API routes
		forgotPassword: undefined,

		tokenExpiration: 3600 * 24 * 30, // 30 days

	},

	fields: [
		{
			tabs: [
				{
					fields: [
						{
							fields: [
								{
									label: 'Título',
									name: 'title',
									options: UserOptions.title,
									type: 'select',
								},
								{
									label: 'Primeiro Nome',
									name: 'first_name',
									type: 'text',
								},
								{
									label: 'Apelido(s)',
									name: 'last_name',
									type: 'text',
								},
							],
							type: 'row',
						},
						{
							fields: [
								{
									label: 'Número de Contribuinte',
									name: 'tax_id',
									required: true,
									type: 'text',
									unique: true,
									validate: value => validateTaxId(value, true) || 'Número de Contribuinte deve ser um número de 9 caracteres.',
								},
								{
									label: 'Número de Cédula Médica',
									name: 'medical_id',
									type: 'number',
								},
							],
							type: 'row',
						},
						{
							fields: [
								{
									label: 'Data de Nascimento',
									name: 'birthday',
									type: 'date',
								},
								{
									label: 'Sócio SPG desde',
									name: 'member_since',
									type: 'date',
								},
							],
							type: 'row',
						},
					],
					label: 'Referências',
				},
				{
					fields: [
						{
							fields: [
								{
									defaultValue: true,
									label: 'Enviar Newsletter',
									name: 'send_newsletter',
									type: 'checkbox',
								},
							],
							type: 'row',
						},
						{
							fields: [
								{
									label: 'Telefone',
									name: 'phone',
									type: 'text',
								},
							],
							type: 'row',
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
							fields: [
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
							type: 'row',
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
							options: UserOptions.subscribed_sections,
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
									type: 'text',
									validate: value => validateTaxId(value, true) || 'NIF (Faturação) deve ser um número de 9 caracteres.',
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
											label: 'Tipo de Documento',
											name: 'doc_type',
											options: [
												{ label: 'Fatura', value: 'invoice' },
												{ label: 'Nota de Crédito', value: 'credit_note' },
											],
											type: 'select',
										},
										{
											label: 'Data de Emissão',
											name: 'doc_date',
											type: 'text',
										},
										{
											label: 'Valor',
											name: 'doc_amount',
											type: 'number',
										},
									],
									type: 'row',
								},
								{
									fields: [
										{
											label: 'Nº do Documento',
											name: 'doc_number',
											type: 'text',
										},
										{
											label: 'ID de Sistema',
											name: 'doc_id',
											type: 'text',
										},
										{
											label: 'Hora de Sistema',
											name: 'doc_system_time',
											type: 'text',
										},
									],
									type: 'row',
								},
								{
									hasMany: true,
									label: 'Produtos associados a esta transação',
									name: 'associated_products',
									relationTo: 'products',
									type: 'relationship',
								},
								{
									admin: {
										components: {
											Field: '@/payload/components/OpenTransactionDocumentButton/index#OpenTransactionDocumentButton',
										},
									},
									name: 'open_pdf',
									type: 'ui',
								},
							],
							label: 'Transações',
							name: 'transactions',
							type: 'array',
						},
					],
					label: 'Pagamentos & Faturas',
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

	hooks: {
		afterChange: [
			afterChangeUser,
		],
	},

	slug: 'users',

};
