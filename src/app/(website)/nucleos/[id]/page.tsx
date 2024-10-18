/* * */

import { getPayloadHMR } from "@payloadcms/next/utilities"
import config from "@/payload.config"
import { notFound } from "next/navigation"
import PageComponent from "@/components/seccoes/Slug"

export default async function Page({ params }: { params: { id: string } }) {

	const payload = await getPayloadHMR({ config })
	const query = await payload.find({
		collection: "nucleos",
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

	return <PageComponent section={query.docs[0]} />


}
