import type { GlobalConfig } from 'payload'

const Footer: GlobalConfig = {
    slug: "footer",
    fields: [
        {
            name: "logo",
            label: "Logo",
            type: "upload",
            relationTo: "media",
        },
        {
            name: "navigation_items",
            label: "Links de Navegação",
            type: "array",
            fields: [
                {
                    name: "label",
                    label: "Label",
                    type: "text",
                    required: true,
                },
                {
                    name: "url",
                    label: "URL",
                    type: "text",
                    required: true,
                },
            ],
        }
    ],

}

export default Footer;