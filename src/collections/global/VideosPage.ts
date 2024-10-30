import type { GlobalConfig } from 'payload'

const VideosPage: GlobalConfig = {
    slug: "videosPage",
    fields: [
		{
			name: "image",
			label: "Imagem",
			type: "upload",
			required: true,
			relationTo: "media",
		},
        {
			name: "logo_right",
			label: "Logo",
			type: "upload",
			required: true,
			relationTo: "media",
		},
	],
}

export default VideosPage;
