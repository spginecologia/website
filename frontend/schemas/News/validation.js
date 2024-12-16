/* * */

import * as yup from 'yup';

/* * */

export const NewsValidation = yup.object({
	description: yup.string().max(500, 'Descrição deve ser menor ou igual que ${max} caracteres.'),
	title: yup.string().required().max(50, 'Título deve ser menor ou igual que ${max} caracteres.'),
});
