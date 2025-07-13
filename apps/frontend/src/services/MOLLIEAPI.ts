/* * */

import { createMollieClient } from '@mollie/api-client';

/* * */

export const MOLLIEAPI = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY ?? 'placeholder' });
