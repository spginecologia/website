/* * */

import { type User } from '@/payload-types';
import { type PayloadRequest } from 'payload';

/* * */

interface Props {
	req?: null | PayloadRequest
	user?: null | User
}

export function accessIsActiveUser({ req, user }: Props): boolean {
	//

	if (!req || !req.user) return false;

	if (req.user.collection !== 'users') return false;

	if (req.user.account_status !== 'active' && req.user.account_status !== 'dormant') return false;

	return true;

	//
}
