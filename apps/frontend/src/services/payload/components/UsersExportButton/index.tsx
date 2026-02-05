'use client';

/* * */

export function UsersExportButton() {
	return (
		<a
			className="btn btn--size-small btn--style-pill"
			href="/api/users/export"
			rel="noreferrer"
			style={{ margin: 0 }}
			target="_blank"
		>
			Exportar lista de socios (CSV)
		</a>
	);
}
