import { getPayloadHMR } from "@payloadcms/next/utilities"
import config from "@/payload.config"

import CategoriesSelectClient from "./client"

export default async function CategoriesSelect() {

    const payload = await getPayloadHMR({ config })
    const categories = await payload.find({
        collection: "categories",
        limit: 1000,
    })

    return <CategoriesSelectClient categories={categories.docs.map((category) => category)} />
}