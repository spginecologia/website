import type { GlobalConfig } from 'payload';

const Footer: GlobalConfig = {
	fields: [
		{
			label: 'Logo',
			name: 'logo',
			relationTo: 'media',
			type: 'upload',
		},
		{
			fields: [
				{
					label: 'Label',
					name: 'label',
					required: true,
					type: 'text',
				},
				{
					label: 'URL',
					name: 'url',
					required: true,
					type: 'text',
				},
			],
			label: 'Links de Navegação',
			name: 'navigation_items',
			type: 'array',
		},
	],
	slug: 'footer',

};

export default Footer;
