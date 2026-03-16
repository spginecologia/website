'use client';

/* * */

import { LoadingOverlay, useDocumentInfo } from '@payloadcms/ui';
import { useState } from 'react';

/* * */

export function UserDetailQuotasRefresh() {
	//

	//
	// A. Fetch data

	const { id: userId } = useDocumentInfo();

	const [isLoading, setIsLoading] = useState(false);

	//
	// B. Handle actions

	const handleRefresh = async () => {
		setIsLoading(true);
		await fetch(`/api/account/quotas/refresh-status/${userId}`);
		window.location.reload();
	};

	//
	// C. Render components

	if (isLoading) {
		return <LoadingOverlay />;
	}

	return (
		<a
			className="btn btn--size-small btn--style-pill"
			onClick={handleRefresh}
			style={{ margin: 0 }}
		>
			Atualizar Quotas
		</a>
	);
}
