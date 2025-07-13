/* * */

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
						options: [
							{ label: 'Aguarda Pagamento', value: 'waiting' },
							{ label: 'Pago', value: 'paid' },
							{ label: 'Reembolso', value: 'refunded' },
							{ label: 'Cancelado', value: 'canceled' },
							{ label: 'ERRO', value: 'error' },
						],
						required: true,
						type: 'select',
					},
					{
						label: 'PaymentLink ID (mollie)',
						name: 'payment_link_id',
						type: 'text',
					},

					{
						fields: [
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
						name: 'system_info',
						type: 'array',
					},
				],
				type: 'row',
			},
		],
		label: 'Pagamentos de Quotas',
		name: 'payments',
		type: 'array',
	},
];

/* * */

export const userFieldsQuotas: Field[] = [
	...userFieldsQuotasBillingDetails,
	...userFieldsQuotasPayments,
];
