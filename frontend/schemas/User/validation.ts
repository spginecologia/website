/* * */

import { UserOptions } from '@/schemas/User/options';
import { validateTaxId } from '@/utils/validate-tax-id';
import { z } from 'zod';

/* * */

export const UserEditableProfileValidation = z
	.object({

		address_1: z
			.coerce
			.string()
			.optional(),

		address_2: z
			.coerce
			.string()
			.optional(),

		billing_address_1: z
			.coerce
			.string()
			.optional(),

		billing_address_2: z
			.coerce
			.string()
			.optional(),

		billing_city: z
			.coerce
			.string()
			.optional(),

		billing_name: z
			.coerce
			.string()
			.optional(),

		billing_postal_code: z
			.coerce
			.string()
			.optional(),

		billing_tax_id: z
			.coerce
			.string()
			.refine(value => validateTaxId(value, true), { message: 'NIF (Faturação) deve ser um número de 9 caracteres.' }),

		birthday: z
			.coerce
			.date()
			.optional()
			.default(new Date(1900, 0, 1)),

		city: z
			.coerce
			.string()
			.optional(),

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
			.optional(),

		send_newsletter: z
			.coerce
			.boolean(),

		send_notifications: z
			.coerce
			.boolean(),

		subscribed_sections: z
			.array(z.coerce.string()),

		title: z
			.enum([...UserOptions.title] as [string, ...string[]])
			.nullable(),

		workplace_primary: z
			.coerce
			.string()
			.optional(),

		workplace_secondary: z
			.coerce
			.string()
			.optional(),

	})
	.strict();

export type UserEditableProfile = z.infer<typeof UserEditableProfileValidation>;
