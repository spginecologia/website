/* * */

import { getPayloadHMR } from "@payloadcms/next/utilities"
import config from "@/payload.config"
import { notFound } from "next/navigation"
import { Section } from "@/components/layout/Section"
import ConsensoList from "@/components/consensos/ConsensosList"


export default async function Page() {

    const payload = await getPayloadHMR({ config })
    const query = await payload.find({
        collection: "consensos",
        sort: "createdAt",
        limit: 100
    })

    if (!query.docs.length) {
        notFound()
    }

    return (
        <>
            <Section heading="Consensos">
                <ConsensoList consensos={query.docs} />
            </Section>
        </>
    )
}