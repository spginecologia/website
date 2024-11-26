import type { GlobalConfig } from 'payload';

const NewVideoPage: GlobalConfig = {
	fields: [
		{
			label: 'Imagem',
			name: 'image',
			relationTo: 'media',
			type: 'upload',
		},
	],
	slug: 'newVideoPage',
};

export default NewVideoPage;
