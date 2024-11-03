// === Academy Routes ===
export const AcademyRoutes = Object.freeze({
	ACADEMY: {
		label: 'Academia', // Updated label
		path: '/academia',
	},
	ACADEMY_COURSES: {
		label: 'Palestras e Cursos', // Updated label
		path: '/academy/courses',
	},
	ACADEMY_GRANT: {
		label: 'Bolsa de Investigação', // Updated label
		path: '/academy/grant',
	},
	ACADEMY_GUIDELINES: {
		label: 'Consensos', // Updated label
		path: '/academy/guidelines',
	},
	ACADEMY_PUBLICATIONS: {
		label: 'Publicações', // Updated label
		path: '/academy/publications',
	},
	ACADEMY_TOPICS: {
		label: 'Pesquisa por Tópicos', // Updated label
		path: '/academy/topics',
	},
	ACADEMY_VIDEOS: {
		label: 'Vídeos', // Updated label
		path: '/academy/videos',
	},
	ACADEMY_VIDEOS_ADD: {
		label: 'Submeter Vídeo', // Updated label
		path: '/academy/videos/add',
	},
});

// === Profile Routes ===
export const AccountRoutes = Object.freeze({
	ACCOUNT: {
		label: 'Conta', // Updated label
		path: '/account',
	},
	ADMIN: {
		label: 'admin', // Unchanged
		path: '/amin',
	},
});

// === Header Routes ===
export const HeaderRoutes = Object.freeze({
	SOCIETY: { label: 'Sociedade', path: '/sociedade' }, // Updated label
	SECTIONS: { label: 'Secções', path: '/seccoes' }, // Updated label
	WORKGROUPS: { label: 'Núcleos', path: '/nucleos' }, // Updated label
	NEWS: { label: 'Notícias', path: '/noticias' }, // Updated label
	AGENDA: { label: 'Agenda', path: '/agenda' }, // Updated label
	AWARD: { label: 'Premios', path: '/premios' }, // Updated label
});

// === Section Routes ===
export const SectionRoutes = Object.freeze({
	GINECOLOGIA: { key: 'ginecologia', path: '/seccoes/ginecologia-oncologica' },
	SPCPTGI: { key: 'spcptgi', path: '/seccoes/spcptgi' },
	SPEG: { key: 'speg', path: '/seccoes/speg' },
	SPM: { key: 'spm', path: '/seccoes/spm' },
	SPUG: { key: 'spug', path: '/seccoes/spug' },
});

// === Workgroups Routes ===
export const WorkgroupsRoutes = Object.freeze({
	COMUNICACAO: { key: 'comunicacao', path: '/nucleos/comunicacao' },
	ECOSONOGRAFIA_GINOLOGICA: { key: 'ecografia-ginecologica', path: '/nucleos/ecografia-ginecologica' },
	ESTUDOS_CLINICOS: { key: 'estudos-clinicos', path: '/nucleos/estudos-clinicos' },
	GINECOLOGIA_INFANCIA_ADOLESCENCIA: { key: 'ginecologia-da-infancia-e-da-adolescencia', path: '/nucleos/ginecologia-da-infancia-e-da-adolescencia' },
	GINECOLOGIA_PSICOSSOMATICA: { key: 'ginecologia-psicossomatica', path: '/nucleos/ginecologia-psicossomatica' },
	MAMA: { key: 'mama', path: '/nucleos/mama' },
	MEDICINA_SEXUAL: { key: 'medicina-sexual', path: '/nucleos/medicina-sexual' },
});

// === Routes ===
export const Routes = Object.freeze({
	ABOUT: { label: 'Sobre Nós', path: '/sobre-nos' }, // Updated label
	CONTACT: { label: 'Contacto', path: '/contacto' }, // Updated label
	HOME: { label: 'home', path: '/' }, // Unchanged
	LOGIN: { label: 'Login', path: '/login' }, // Updated label
	PRIVACY: { label: 'Política de Privacidade', path: '/politica-de-privacidade' }, // Updated label
	SEARCH: { label: 'search', path: '/search' }, // Unchanged
	SUBSCRIPTION: { label: 'Subscrição', path: '/subscricao' }, // Updated label
	TERMS: { label: 'Termos e Condições', path: '/terms' }, // Updated label

	// Header
	...HeaderRoutes,

	// Account
	...AccountRoutes,

	// Academy
	...AcademyRoutes,

	// Section
	...SectionRoutes,

	// Workgroups
	...WorkgroupsRoutes,
});
