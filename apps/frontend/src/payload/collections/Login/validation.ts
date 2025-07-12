/* * */

import { validateEmail } from '@/src/utils/validate-email';
import { validateTaxId } from '@/src/utils/validate-tax-id';
import { z } from 'zod';

/* * */

export const LoginValidation = z
	.object({

		password: z
			.string()
			.min(5, 'A password deve ter pelo menos 5 caracteres.'),

		username: z
			.string()
			.refine((value) => {
				const isValidTaxId = validateTaxId(value, true, ['singular']);
				const isValidEmail = validateEmail(value, true);
				// Return true if if the value is not empty
				// and is either a valid Tax ID or a valid Email.
				return !!value && (isValidTaxId || isValidEmail);
			}, { message: 'Email ou NIF devem ser válidos.' }),

	})
	.strict();
