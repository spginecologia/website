/* * */

import { validateEmail } from '@/services/general/validate-email';
import { z } from 'zod/v4';

/* * */

export const NewsletterValidation = z
	.object({

		email: z
			.string()
			.refine(value => validateEmail(value, false), { message: 'Email não é válido.' }),

		name: z
			.string()
			.optional(),

		turnstile_token: z
			.string(),

	})
	.strict();
