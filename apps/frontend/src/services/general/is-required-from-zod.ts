/* * */

import { z } from 'zod';

/* * */

export function isRequiredFromZod(schema: z.ZodTypeAny) {
	return !(
		schema instanceof z.ZodOptional
		|| schema instanceof z.ZodNullable
		|| schema instanceof z.ZodDefault
	);
}
