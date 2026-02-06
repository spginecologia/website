/* * */

export const UserOptions = {

	account_role: [
		{ label: '0 - Sócio Regular', value: 'member' },
		{ label: '1 - Gestor de Vídeos', value: 'video-manager' },
		{ label: '2 - Gestor de Conteúdos', value: 'content-manager' },
		{ label: '3 - Gestor de Sócios', value: 'users-manager' },
		{ label: '4 - Administrador', value: 'admin' },
	],

	account_status: [
		{ label: 'Ativo', value: 'active' },
		{ label: 'Pendente de Aprovação', value: 'waiting' },
		{ label: 'Inativo / Desconhecido', value: 'dormant' },
	],

	payment_status: [
		{ label: 'Aguarda Pagamento', value: 'waiting' },
		{ label: 'Oferta', value: 'free' },
		{ label: 'Pago', value: 'paid' },
		{ label: 'Reembolso', value: 'refunded' },
		{ label: 'Cancelado', value: 'canceled' },
	],

	subscribed_sections: [
		{ label: 'Colposcopia Patologia Tracto Genital Inferior', value: 'colposcopia_patologia_tracto_genital_inferior' },
		{ label: 'Endoscopia Ginecológica', value: 'endoscopia_ginecologica' },
		{ label: 'Ginecologia Oncológica', value: 'ginecologia_oncologica' },
		{ label: 'Menopausa', value: 'menopausa' },
		{ label: 'Uroginecologia', value: 'uroginecologia' },
	],

	title: [
		'',
		'Sr.',
		'Sr.ª',
		'Dr.',
		'Dr.ª',
		'Prof.',
		'Prof.ª',
		'Exmo.',
		'Exmo.ª',
	],

} as const;

/* * */

export const userQuotaPaymentStatusValues = UserOptions.payment_status.map(option => option.value);

export type UserQuotaPaymentStatus = typeof UserOptions.payment_status[number]['value'];
