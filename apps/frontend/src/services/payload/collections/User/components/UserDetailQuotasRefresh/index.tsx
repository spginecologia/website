'use client';

/* * */

import { useDocumentInfo } from '@payloadcms/ui';

/* * */

export function UserDetailQuotasRefresh() {
	//

	//
	// A. Fetch data

	const { id: userId } = useDocumentInfo();

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
			Atualizar Quotas
		</a>
	);
}
