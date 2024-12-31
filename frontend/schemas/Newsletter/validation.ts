/* * */

import { validateEmail } from '@/utils/validate-email';
import { z } from 'zod';

/* * */

export const NewsletterValidation = z
	.object({

		email: z
			.string()
			.refine(value => validateEmail(value, false), { message: 'Email não é válido.' }),

		name: z
			.string()
			.optional(),

	})
	.strict();
