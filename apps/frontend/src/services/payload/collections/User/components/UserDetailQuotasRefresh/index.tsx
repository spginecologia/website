'use client';

/* * */

import { useField } from '@payloadcms/ui';

/* * */

export function UserDetailQuotasRefresh({ path }) {
	//

	//
	// A. Fetch data

	const { value: userId } = useField({ path: '_id' });

	//
	// B. Render components

	return (
		<a
			className="btn btn--size-small btn--style-pill"
			href={`/api/account/quotas/refresh-status/${userId}`}
			rel="noreferrer"
			style={{ margin: 0 }}
			target="_blank"
		>
			Atualizar Quotas - {userId} - {path}
		</a>
	);
}
