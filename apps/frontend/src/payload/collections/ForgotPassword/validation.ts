/* * */

import { validateEmail } from '@/utils/validate-email';
import { validateTaxId } from '@/utils/validate-tax-id';
import { z } from 'zod';

/* * */

export const ForgotPasswordValidation = z
	.object({

		username: z
			.string()
			.refine((value) => {
				const isValidTaxId = validateTaxId(value, true, ['singular']);
				const isValidEmail = validateEmail(value, true);
				// Return true if if the value is not empty
				// and is either a valid Tax ID or a valid Email.
				return !!value && (isValidTaxId || isValidEmail);
			}, { error: 'Email ou NIF devem ser válidos.' }),

	})
	.strict();
