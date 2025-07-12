/* * */

import { z } from 'zod';

/* * */

// const MAX_FILE_SIZE = 50000000000000000;

// const ACCEPTED_IMAGE_TYPES = [
// 	'image/jpeg',
// 	'image/jpg',
// 	'image/png',
// 	'image/webp',
// ];

/* * */

export const VideoValidation = z
	.any()
	.refine(file => !!file, { message: 'Selecione um ficheiro de vídeo' });
	// .refine(files => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), { message: '.jpg, .jpeg, .png and .webp files are accepted.' })
	// .refine(files => files?.[0]?.size <= MAX_FILE_SIZE, { message: `Max file size is 5MB.` }),
