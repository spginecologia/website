'use client';

/* * */

import { i18nResourceKeysPt } from '@/i18n/resources';
import i18next from 'i18next';
import ICU from 'i18next-icu';
import { initReactI18next } from 'react-i18next';

/* * */

i18next
	.use(ICU)
	.use(initReactI18next)
	.init({
		debug: true,
		fallbackLng: 'pt',
		resources: {
			pt: i18nResourceKeysPt,
		},
	});
