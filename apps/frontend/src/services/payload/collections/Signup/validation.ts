/* * */

import { validateTaxId } from '@/services/general/validate-tax-id';
import { UserOptions } from '@/services/payload/collections/User/options';
import { z } from 'zod/v4';

/* * */

export const SignupFormValidation = z
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

		birthday: z
			.date()
			.nullish()
			.default(new Date(1900, 0, 1)),

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

		medical_id: z
			.number(),

		phone: z
			.string({ message: 'Telefone é um campo obrigatório.' })
			.min(9, { message: 'Phone deve ser maior ou igual que 9 caracteres.' })
			.max(13, { message: 'Phone deve ser menor ou igual que 13 caracteres.' }),

		postal_code: z
			.string()
			.nullish(),

		send_newsletter: z
			.boolean(),

		subscribed_sections: z
			.array(z.enum(UserOptions.subscribed_sections.map(section => section.value) as [string, ...string[]]))
			.nullish(),

		tax_id: z
			.string(),

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

export type SignupForm = z.infer<typeof SignupFormValidation>;
