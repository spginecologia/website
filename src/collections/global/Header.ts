import type { GlobalConfig } from 'payload'

const Header: GlobalConfig = {
    slug: "header",
    fields: [
        {
            name: "logo",
            label: "Logo",
            type: "upload",
            relationTo: "media",
        },
        {
            name: "academiaDropdownLogo",
            label: "Academia Dropdown Logo",
            type: "upload",
            relationTo: "media",
        },
        {
            name: "navigationItems",
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
        },
        {
            name: "academyDropdownMenu",
            label: "Academy Dropdown Menu",
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
                {
                    name: "logo",
                    label: "Logo",
                    type: "upload",
                    relationTo: "media",
                },
            ],
        }
    ],

}

export default Header;