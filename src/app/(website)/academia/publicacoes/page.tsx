/* * */

import { getPayloadHMR } from "@payloadcms/next/utilities"
import config from "@/payload.config"
import { notFound } from "next/navigation"
import { Section } from "@/components/layout/Section"
import PublicationList from "@/components/publicacoes/PublicationList"


export default async function Page() {

    const payload = await getPayloadHMR({ config })
    const query = await payload.find({
        collection: "publications",
        sort: "createdAt",
        limit: 100
    })

    if (!query.docs.length) {
        notFound()
    }

    return (
        <>
            <Section heading="Publicações Científicas">
                <PublicationList publications={query.docs} />
            </Section>
        </>
    )
}