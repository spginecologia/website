/* * */

import { CourseDetail } from '@/components/courses/CourseDetail';

/* * */

export default async function Page({ params }) {
	const { id } = await params;
	return <CourseDetail id={id} />;
}
