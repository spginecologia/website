/* * */

import { getPayload } from 'payload'
import config from "@/payload.config"
import { notFound } from "next/navigation"
import PageComponent from "@/components/news/Slug"

export default async function Page({ params }: { params: { id: string } }) {

	const payload = await getPayload({ config })
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
