/* * */

import { type PayloadRequest } from 'payload';
import { type Admin } from 'payload-types';

/* * */

interface Props {
	admin?: Admin | null
	req?: null | PayloadRequest
}

/* * */

export function accessIsAdmin({ admin, req }: Props): boolean {
	//

	if (admin) {
		return true;
	}

	if (req && req.user && req.user.collection === 'admins') {
		return true;
	}

	return false;

	//
}
