/* * */

import * as yup from 'yup';

/* * */

export const UserValidation = yup.object({
	email: yup.string().email('Please provide a valid email address.').required('Email é um campo obrigatório.'),
	full_name: yup.string().max(150, 'Nome Completo deve ser menor ou igual que ${max} caracteres.').required('Nome Completo é um campo obrigatório.'),
	last_name: yup.string().max(25, 'Último Nome deve ser menor ou igual que ${max} caracteres.').required('Último Nome é um campo obrigatório.'),
	name: yup.string().max(25, 'Primeiro Nome deve ser menor ou igual que ${max} caracteres.').required('Primeiro Nome é um campo obrigatório.'),
	phone: yup.string().max(13, 'Phone deve ser menor ou igual que ${max} caracteres.'),
	title: yup.string().nullable(),
});
