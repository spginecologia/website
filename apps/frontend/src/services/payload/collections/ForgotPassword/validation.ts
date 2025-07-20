/* * */

import { validateEmail } from '@/utils/validate-email';
import { validateTaxId } from '@/utils/validate-tax-id';
import { z } from 'zod/v4';

/* * */

export const ForgotPasswordValidation = z
	.object({

		username: z
			.string()
			.check((ctx) => {
				const isValidTaxId = validateTaxId(ctx.value, true, ['singular']);
				const isValidEmail = validateEmail(ctx.value, true);
				// Return true if if the value is not empty
				// and is either a valid Tax ID or a valid Email.
				if (!(!!ctx.value && (isValidTaxId || isValidEmail))) ctx.issues.push({
					code: 'custom',
					input: ctx.value,
					message: 'Email ou NIF devem ser válidos.',
				});
			}),

	})
	.strict();
