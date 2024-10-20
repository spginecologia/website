/* * */

import { getPayloadHMR } from "@payloadcms/next/utilities"
import config from "@/payload.config"
import { notFound } from "next/navigation"
import PageComponent from "@/components/eventos/Slug"

export default async function Page({ params }: { params: { slug: string } }) {

    const payload = await getPayloadHMR({ config })
    const query = await payload.find({
        collection: "events",
        where: {
            slug: {
                equals: params.slug
            }
        },
    })

    if (!query.docs.length) {
        notFound()
    }

    return <PageComponent event={query.docs[0]} />


}
