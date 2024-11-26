import { Field } from 'payload';

import { categoriesField } from './categories';
import { featuredImageField } from './featured-image';
import { slugField } from './slug';

export const sidebarFields: Field[] = [
	slugField(),
	categoriesField,
	featuredImageField,
];
