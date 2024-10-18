/* * */

import { getPayloadHMR } from "@payloadcms/next/utilities"
import config from "@/payload.config"
import { notFound } from "next/navigation"
import PageComponent from "@/components/noticias/Slug"

export default async function Page({ params }: { params: { id: string } }) {

	const payload = await getPayloadHMR({ config })
	const query = await payload.find({
		collection: "noticias",
		where: {
			slug: {
				equals: params.id
			}
		},
		depth: 1
	})

	if (!query.docs.length) {
		notFound()
	}

	return <PageComponent item={query.docs[0]} />


}
