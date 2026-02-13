'use client';

/* * */

export function UsersListExportUnpaidButton() {
	return (
		<a
			className="btn btn--size-small btn--style-pill"
			href="/api/users/export-unpaid"
			rel="noreferrer"
			style={{ margin: 0 }}
			target="_blank"
		>
			Exportar sócios em dívida (CSV)
		</a>
	);
}
