/* * */

import { UserOptions } from '@/src/payload/collections/User/options';
import { validateTaxId } from '@/src/utils/validate-tax-id';
import { z } from 'zod';

/* * */

export const UserEditableProfileValidation = z
	.object({

		address_1: z
			.coerce
			.string()
			.nullish(),

		address_2: z
			.coerce
			.string()
			.nullish(),

		billing_address_1: z
			.coerce
			.string()
			.nullish(),

		billing_address_2: z
			.coerce
			.string()
			.nullish(),

		billing_city: z
			.coerce
			.string()
			.nullish(),

		billing_name: z
			.coerce
			.string()
			.nullish(),

		billing_postal_code: z
			.coerce
			.string()
			.nullish(),

		billing_tax_id: z
			.coerce
			.string()
			.refine(value => validateTaxId(value, true, ['singular', 'company']), { message: 'NIF (Faturação) deve ser um número de 9 caracteres.' }),

		city: z
			.coerce
			.string()
			.nullish(),

		country: z
			.coerce
			.string({ message: 'País é um campo obrigatório.' }),

		email: z
			.coerce
			.string({ message: 'Email é um campo obrigatório.' })
			.email({ message: 'Please provide a valid email address.' }),

		first_name: z
			.coerce
			.string({ message: 'Primeiro Nome é um campo obrigatório.' })
			.max(25, { message: 'Primeiro Nome deve ser menor ou igual que ${max} caracteres.' }),

		last_name: z
			.coerce
			.string({ message: 'Último Nome é um campo obrigatório.' })
			.max(25, { message: 'Último Nome deve ser menor ou igual que ${max} caracteres.' }),

		phone: z
			.coerce
			.string({ message: 'Telefone é um campo obrigatório.' })
			.min(9, { message: 'Phone deve ser maior ou igual que 9 caracteres.' })
			.max(13, { message: 'Phone deve ser menor ou igual que 13 caracteres.' }),

		postal_code: z
			.coerce
			.string()
			.nullish(),

		send_newsletter: z
			.coerce
			.boolean(),

		subscribed_sections: z
			.array(z.coerce.string()),

		title: z
			.enum([...UserOptions.title] as [string, ...string[]])
			.nullish(),

		workplace_primary: z
			.coerce
			.string()
			.nullish(),

		workplace_secondary: z
			.coerce
			.string()
			.nullish(),

	});

export type UserEditableProfile = z.infer<typeof UserEditableProfileValidation>;
