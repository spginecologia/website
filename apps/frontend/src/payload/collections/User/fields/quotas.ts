/* * */

import { UserOptions } from '@/payload/collections/User/options';
import { validateTaxId } from '@/utils/validate-tax-id';
import { type Field } from 'payload';

/* * */

export const userFieldsQuotasBillingDetails: Field[] = [
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
				validate: (value: string) => {
					return validateTaxId(value, true, ['singular', 'company']) || 'NIF (Faturação) deve ser um número de 9 caracteres.';
				},
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
];

/* * */

export const userFieldsQuotasPayments: Field[] = [
	{
		defaultValue: [],
		fields: [
			{
				fields: [
					{
						label: 'Data de Emissão da Quota',
						name: 'request_date',
						required: true,
						type: 'date',
					},
					{
						label: 'Ano da Quota',
						min: 1975,
						name: 'year',
						required: true,
						type: 'number',
					},
					{
						label: 'Valor do Pagamento',
						name: 'payment_amount',
						required: true,
						type: 'number',
					},
					{
						label: 'Estado do Pagamento',
						name: 'payment_status',
						options: [...UserOptions.payment_status],
						required: true,
						type: 'select',
					},
				],
				type: 'row',
			},
			{
				fields: [
					{
						label: 'Mollie Payment Link ID',
						name: 'payment_link_id',
						required: true,
						type: 'text',
					},
					{
						label: 'Mollie Payment Link URL',
						name: 'payment_link_url',
						required: true,
						type: 'text',
					},
				],
				type: 'row',
			},
			{
				defaultValue: [],
				fields: [
					{
						fields: [
							{
								label: 'ID de Sistema',
								name: 'doc_id',
								required: true,
								type: 'text',
							},
							{
								label: 'Nº do Documento',
								name: 'doc_number',
								required: true,
								type: 'text',
							},
							{
								label: 'Hora de Sistema',
								name: 'doc_system_time',
								required: true,
								type: 'text',
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
						type: 'row',
					},
				],
				label: 'Faturas',
				name: 'invoices',
				type: 'array',
			},
		],
		label: 'Pagamentos de Quotas',
		name: 'quotas',
		type: 'array',
	},
];

/* * */

export const userFieldsQuotas: Field[] = [
	...userFieldsQuotasBillingDetails,
	...userFieldsQuotasPayments,
];
