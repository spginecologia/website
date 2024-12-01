/* * */

import { z } from 'zod';

/* * */

const MAX_FILE_SIZE = 5000000000000; // 5MB

const ACCEPTED_IMAGE_TYPES = [
	'image/jpeg',
	'image/jpg',
	'image/png',
];

/* * */

export const OptionalMediaValidation = z
	.any()
	.optional()
	.refine(files => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), { message: '.jpg, .jpeg, .png files are accepted.' })
	.refine(files => files?.[0]?.size <= MAX_FILE_SIZE, { message: `Max file size is 5MB.` });

export const RequiredMediaValidation = z
	.any()
	.refine(file => !!file, { message: 'Selecione uma imagem' })
	.refine(files => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), { message: '.jpg, .jpeg, .png files are accepted.' })
	.refine(files => files?.[0]?.size <= MAX_FILE_SIZE, { message: `Max file size is 5MB.` });
