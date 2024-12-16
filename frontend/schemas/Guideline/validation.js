/* * */

import * as yup from 'yup';

/* * */

export const GuidelineValidation = yup.object({
	title: yup.string().required().max(50, 'Título deve ser menor ou igual que ${max} caracteres.'),
});
