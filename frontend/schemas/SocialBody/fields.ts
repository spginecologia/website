/* * */

import type { Field } from 'payload';

/* * */

export const SocialBodyMemberMetadata: Field = {
	fields: [
		{
			label: 'Nome',
			name: 'name',
			required: true,
			type: 'text',
		},
		{
			label: 'Cargo',
			name: 'position',
			type: 'text',
		},
		{
			label: 'Cidade',
			name: 'city',
			type: 'text',
		},
	],
	type: 'row',
};

export const SocialBodyMemberPhoto: Field = {
	label: 'Foto',
	name: 'photo',
	relationTo: 'media',
	type: 'upload',
};
