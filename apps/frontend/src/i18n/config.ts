'use client';

/* * */

import { i18nResourceKeysPt } from '@/i18n/resources';
import i18next from 'i18next';
import ICU from 'i18next-icu';
import { initReactI18next } from 'react-i18next';

/* * */

await i18next
	.use(ICU)
	.use(initReactI18next)
	.init({
		defaultNS: 'default',
		fallbackLng: 'pt',
		ns: Object.keys(i18nResourceKeysPt),
		resources: {
			pt: i18nResourceKeysPt,
		},
		showSupportNotice: false,
	});
