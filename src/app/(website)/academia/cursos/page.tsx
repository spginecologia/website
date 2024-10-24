/* * */

import { getPayloadHMR } from "@payloadcms/next/utilities"
import config from "@/payload.config"
import { notFound } from "next/navigation"
import { Section } from "@/components/layout/Section"
import CoursesList from "@/components/courses/CourseList"

export default async function Page() {

    const payload = await getPayloadHMR({ config })
    const query = await payload.find({
        collection: "courses",
        sort: "createdAt",
    })

    if (!query.docs.length) {
        notFound()
    }

    const courses = query.docs

    return (
        <>
            <Section heading="Palestras & Cursos">
                <CoursesList courses={courses} />
            </Section>
        </>
    )
}