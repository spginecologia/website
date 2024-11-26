/* * */

import CoursesList from '@/components/courses/CourseList';
import { Section } from '@/components/layout/Section';
import config from '@/payload.config';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';

export default async function Page() {
	const payload = await getPayload({ config });
	const query = await payload.find({
		collection: 'courses',
		sort: 'createdAt',
	});

	if (!query.docs.length) {
		notFound();
	}

	const courses = query.docs;

	return (
		<>
			<Section heading="Palestras & Cursos">
				<CoursesList courses={courses} />
			</Section>
		</>
	);
}
