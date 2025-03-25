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

	if (req && req.user) {
		if (req.user.collection === 'users' && req.user.account_status === 'active') {
			return true;
		}
		return false;
	}

	if (user && user.account_status === 'active') {
		return true;
	}

	return false;

	//
}
