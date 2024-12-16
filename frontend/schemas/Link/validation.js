/* * */

import * as yup from 'yup';

/* * */

export const LinkValidation = yup.object({
	title: yup.string().required().max(50, 'Título deve ser menor ou igual que ${max} caracteres.'),
});
