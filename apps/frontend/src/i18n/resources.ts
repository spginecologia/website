'use client';

/* * */

import namespaceAcademiaPt from '@/i18n/namespaces/academia/pt.json' with { type: 'json' };
import namespaceDefaultPt from '@/i18n/namespaces/default/pt.json' with { type: 'json' };

/**
 * Resource keys for i18n translations in Portuguese.
 * These keys map to the respective translation files
 * for each language and namespace. They are the glue that
 * connects the i18n system to the actual translation strings.
 */
export const i18nResourceKeysPt = {
	academia: namespaceAcademiaPt,
	default: namespaceDefaultPt,
} as const;
