/* * */

import { UserOptions } from '@/payload/collections/User/options';
import { validateTaxId } from '@/utils/validate-tax-id';
import { z } from 'zod/v4';

/* * */

export const UserEditableProfileValidation = z
	.object({

		address_1: z
			.string()
			.nullish(),

		address_2: z
			.string()
			.nullish(),

		billing_address_1: z
			.string()
			.nullish(),

		billing_address_2: z
			.string()
			.nullish(),

		billing_city: z
			.string()
			.nullish(),

		billing_name: z
			.string()
			.nullish(),

		billing_postal_code: z
			.string()
			.nullish(),

		billing_tax_id: z
			.string()
			.refine(value => validateTaxId(value, true, ['singular', 'company']), { message: 'NIF (Faturação) deve ser um número de 9 caracteres.' }),

		city: z
			.string()
			.nullish(),

		country: z
			.string({ message: 'País é um campo obrigatório.' }),

		email: z
			.email({ message: 'Please provide a valid email address.' }),

		first_name: z
			.string({ message: 'Primeiro Nome é um campo obrigatório.' })
			.max(25, { message: 'Primeiro Nome deve ser menor ou igual que ${max} caracteres.' }),

		last_name: z
			.string({ message: 'Último Nome é um campo obrigatório.' })
			.max(25, { message: 'Último Nome deve ser menor ou igual que ${max} caracteres.' }),

		phone: z
			.string({ message: 'Telefone é um campo obrigatório.' })
			.min(9, { message: 'Phone deve ser maior ou igual que 9 caracteres.' })
			.max(13, { message: 'Phone deve ser menor ou igual que 13 caracteres.' }),

		postal_code: z
			.string()
			.nullish(),

		send_newsletter: z
			.boolean(),

		subscribed_sections: z.array(z.string()),

		title: z
			.enum([...UserOptions.title] as [string, ...string[]])
			.nullish(),

		workplace_primary: z
			.string()
			.nullish(),

		workplace_secondary: z
			.string()
			.nullish(),

	});

export type UserEditableProfile = z.infer<typeof UserEditableProfileValidation>;
