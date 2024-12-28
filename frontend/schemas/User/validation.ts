/* * */

import { UserOptions } from '@/schemas/User/options';
import { z } from 'zod';

/* * */

export const UserValidation = z.object({

	address_1: z
		.string()
		.optional(),

	address_2: z
		.string()
		.optional(),

	billing_address_1: z
		.string()
		.optional(),

	billing_address_2: z
		.string()
		.optional(),

	billing_city: z
		.string()
		.optional(),

	billing_name: z
		.string()
		.optional(),

	billing_postal_code: z
		.string()
		.optional(),

	billing_tax_id: z
		.string()
		.max(9)
		.optional(),

	birthday: z
		.date()
		.optional(),

	city: z
		.string()
		.optional(),

	country: z
		.string({ message: 'País é um campo obrigatório.' }),

	email: z
		.string({ message: 'Email é um campo obrigatório.' })
		.email({ message: 'Please provide a valid email address.' }),

	full_name: z
		.string({ message: 'Nome Completo é um campo obrigatório.' })
		.min(2, { message: 'Nome Completo deve ser maior ou igual que 2 caracteres.' })
		.max(150, { message: 'Nome Completo deve ser menor ou igual que 150 caracteres.' }),

	last_name: z
		.string({ message: 'Último Nome é um campo obrigatório.' })
		.max(25, { message: 'Último Nome deve ser menor ou igual que ${max} caracteres.' }),

	name: z
		.string({ message: 'Primeiro Nome é um campo obrigatório.' })
		.max(25, { message: 'Primeiro Nome deve ser menor ou igual que ${max} caracteres.' }),

	phone: z
		.string({ message: 'Telefone é um campo obrigatório.' })
		.min(9, { message: 'Phone deve ser maior ou igual que 9 caracteres.' })
		.max(13, { message: 'Phone deve ser menor ou igual que 13 caracteres.' }),

	postal_code: z
		.string()
		.optional(),

	send_newsletter: z
		.boolean(),

	send_notifications: z
		.boolean(),

	subscribed_sections: z
		.array(z.string()),

	title: z
		.enum([...UserOptions.title] as [string, ...string[]])
		.nullable(),

	workplace_primary: z
		.string()
		.optional(),

	workplace_secondary: z
		.string()
		.optional(),

});
