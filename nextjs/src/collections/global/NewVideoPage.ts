import type { GlobalConfig } from 'payload'

const NewVideoPage: GlobalConfig = {
    slug: "newVideoPage",
    fields: [
        {
            name: "image",
            label: "Imagem",
            type: "upload",
            relationTo: "media",
        },
    ],
}

export default NewVideoPage;