import type { GlobalConfig } from 'payload'

const Account: GlobalConfig = {
    slug: "account",
    fields: [
        {
            name: "logo",
            label: "Logo",
            type: "upload",
            relationTo: "media",
        },
        {
            name: "logo_logged",
            label: "Logo Logged",
            type: "upload",
            relationTo: "media",
        },
    ],
}

export default Account;