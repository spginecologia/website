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
    ],
}

export default Account;