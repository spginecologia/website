import type { GlobalConfig } from 'payload';

const Header: GlobalConfig = {
	fields: [
		{
			label: 'Logo',
			name: 'logo',
			relationTo: 'media',
			type: 'upload',
		},
		{
			label: 'Academia Dropdown Logo',
			name: 'academiaDropdownLogo',
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
			name: 'navigationItems',
			type: 'array',
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
				{
					label: 'Logo',
					name: 'logo',
					relationTo: 'media',
					type: 'upload',
				},
			],
			label: 'Academy Dropdown Menu',
			name: 'academyDropdownMenu',
			type: 'array',
		},
	],
	slug: 'header',

};

export default Header;
