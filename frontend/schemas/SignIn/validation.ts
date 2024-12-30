/* * */

import { z } from 'zod';

/* * */

export const SignInValidation = z
	.object({

		email: z
			.string()
			.email('Por favor introduza um email válido.'),

		password: z
			.string()
			.min(5, 'A password deve ter pelo menos 5 caracteres.'),

	})
	.strict();
