/* * */

import { mollieActivateQuotas } from '@/services/mollie/mollie-activate-quotas';
import { mollieUpdateQuotaStatus } from '@/services/mollie/mollie-update-quota-status';
import { redirect } from 'next/navigation';

/* * */

// This endpoint is called on changes to a Mollie Payment status (not Payment Links).
// When it is paid, cancelled, refunded, etc. These notifications must be treated
// as just notifications, and as such it is necessary to fetch from Mollie API.

/* * */

interface ContextProps {
	params: Promise<{ user_id: string }>
}

/* * */

export async function GET(request: Request, { params }: ContextProps) {
	try {
		//

		const { user_id } = await params;

		if (!user_id) {
			return new Response('User ID is required', { status: 400 });
		}

		/* * */

		await mollieActivateQuotas(user_id);

		await mollieUpdateQuotaStatus(user_id);

		/* * */

		return new Response('OK', { status: 300 });

		//
	}
	catch (err) {
		console.log(err);
		return new Response(null, { status: 400 });
	}
	finally {
		redirect('/account');
	}
}

/* * */

export async function POST(request: Request, { params }: ContextProps) {
	try {
		//

		const { user_id } = await params;

		if (!user_id) {
			return new Response('User ID is required', { status: 400 });
		}

		await mollieUpdateQuotaStatus(user_id);

		return new Response('OK', { status: 200 });

		//
	}
	catch (err) {
		console.log(err);
		return new Response(null, { status: 400 });
	}
}
