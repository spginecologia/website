/* * */

import { validateTaxId } from '@/services/general/validate-tax-id';
import { SignupOptions } from '@/services/payload/collections/Signup/options';
import { UserOptions } from '@/services/payload/collections/User/options';
import { z } from 'zod/v4';

/* * */

export const SignupFormValidation = z.object({

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
		.refine(value => validateTaxId(value, true, ['singular', 'company']), { message: 'NIF (Faturação) deve ser um número de 9 caracteres.' })
		.nullish(),

	birthday: z
		.string()
		.refine(value => new Date(value) < new Date(), { message: 'Data de Nascimento deve ser uma data no passado.' })
		.refine(value => new Date(value) > new Date(1900, 0, 1), { message: 'Data de Nascimento deve ser uma data após 01/01/1900.' }),

	city: z
		.string()
		.nullish(),

	country: z
		.string({ message: 'País é um campo obrigatório.' }),

	email: z
		.email({ message: 'Por favor forneça um endereço de email válido.' }),

	enrolment_curriculum: z
		.string({ message: 'Currículo (resumo)' })
		.nullish(),

	enrolment_sponsors: z
		.array(z.object({
			is_valid: z.boolean().default(false),
			tax_id: z.string().refine(value => validateTaxId(value, true, ['singular']), { message: 'NIF deve ser um número de 9 caracteres. Apenas são aceites NIFs pessoais.' }),
		}))
		.min(SignupOptions.required_sponsor_count, { message: `Deve fornecer pelo menos ${SignupOptions.required_sponsor_count} NIFs para candidatura a Sócio Efetivo.` })
		.max(5, { message: 'Só pode fornecer até cinco NIFs para candidatura a Sócio Efetivo.' })
		.refine(sponsors => sponsors.every(sponsor => sponsor.is_valid), { message: 'Detetámos um NIF inválido.' })
		.refine((sponsors) => {
			const taxIds = sponsors.map(sponsor => sponsor.tax_id);
			return new Set(taxIds).size === taxIds.length;
		}, { message: 'Não pode indicar o mesmo NIF mais do que uma vez.' })
		.nullish(),

	first_name: z
		.string({ message: 'Primeiro Nome é um campo obrigatório.' })
		.max(25, { message: 'Primeiro Nome deve ser menor ou igual que 25 caracteres.' }),

	last_name: z
		.string({ message: 'Último Nome é um campo obrigatório.' })
		.max(25, { message: 'Último Nome deve ser menor ou igual que 25 caracteres.' }),

	medical_id: z
		.string()
		.max(10, { message: 'Número de Cédula Médica deve ser menor ou igual que 10 caracteres.' }),

	medical_specialty: z
		.enum([...UserOptions.medical_specialty.map(option => option.value)])
		.nullish(),

	medical_specialty_other: z
		.string()
		.nullish(),

	phone: z
		.string({ message: 'Telefone é um campo obrigatório.' })
		.min(9, { message: 'Telefone deve ser maior ou igual que 9 caracteres.' })
		.max(13, { message: 'Telefone deve ser menor ou igual que 13 caracteres.' }),

	postal_code: z
		.string()
		.nullish(),

	send_newsletter: z
		.boolean()
		.default(true),

	subscribed_sections: z
		.array(z.enum(UserOptions.subscribed_sections.map(section => section.value) as [string, ...string[]]))
		.nullish(),

	tax_id: z
		.string()
		.refine(value => validateTaxId(value, true, ['singular']), { message: 'NIF deve ser um número de 9 caracteres. Apenas são aceites NIFs pessoais.' }),

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
