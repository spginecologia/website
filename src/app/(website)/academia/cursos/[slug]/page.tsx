/* * */

import { getPayloadHMR } from "@payloadcms/next/utilities"
import config from "@/payload.config"
import { notFound } from "next/navigation"
import PageComponent from "@/components/courses/Slug"

export default async function Page({ params }: { params: { slug: string } }) {

    const payload = await getPayloadHMR({ config })
    const query = await payload.find({
        collection: "courses",
        where: {
            slug: {
                equals: params.slug
            }
        },
    })

    if (!query.docs.length) {
        notFound()
    }

    return <PageComponent course={query.docs[0]} />


}
