/* * */

import { z } from 'zod/v4';

/* * */

export const ResetPasswordValidation = z
	.object({

		password: z
			.string()
			.min(5, 'A password deve ter pelo menos 5 caracteres.'),

		password_confirmation: z
			.string()
			.min(5, 'A password deve ter pelo menos 5 caracteres.'),

	})
	.strict();
