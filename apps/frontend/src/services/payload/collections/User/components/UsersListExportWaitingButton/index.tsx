'use client';

/* * */

export function UsersListExportWaitingButton() {
	return (
		<a
			className="btn btn--size-small btn--style-pill"
			href="/api/users/export-waiting"
			rel="noreferrer"
			style={{ margin: 0 }}
			target="_blank"
		>
			Exportar sócios por aprovar (CSV)
		</a>
	);
}
