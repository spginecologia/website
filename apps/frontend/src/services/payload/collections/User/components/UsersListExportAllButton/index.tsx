'use client';

/* * */

export function UsersListExportAllButton() {
	return (
		<a
			className="btn btn--size-small btn--style-pill"
			href="/api/users/export-all"
			rel="noreferrer"
			style={{ margin: 0 }}
			target="_blank"
		>
			Exportar todos os sócios (CSV)
		</a>
	);
}
