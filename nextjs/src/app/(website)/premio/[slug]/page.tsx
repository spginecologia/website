/* * */

import { getPayload } from 'payload'
import config from "@/payload.config"
import { notFound } from "next/navigation"
import { Section } from "@/components/layout/Section"
import RichText from "@/components/common/RichText"

export default async function Page({ params }: { params: { slug: string } }) {

    const payload = await getPayload({ config })
    const query = await payload.find({
        collection: "prizes",
        where: {
            slug: {
                equals: params.slug
            }
        },
        depth: 1
    })

    if (!query.docs.length) {
        notFound()
    }

    return <Section>
        <h1>{query.docs[0].title}</h1>
        {query.docs[0].content && <RichText content={query.docs[0].content} />}
    </Section>


}
