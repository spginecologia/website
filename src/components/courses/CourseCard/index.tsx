/* * */

import { Card, CardContent, CardFooter, CardHeader } from "@/components/common/card"
import { Category, Course, Media } from "@/payload-types"

import styles from "./styles.module.css"
import { Grid } from "@/components/layout/Grid";
import Categories from "@/components/common/Categories";
import { DateTime } from "luxon";
/* * */

export default function CourseCard({ course }: { course: Course }) {


    return (
        <Card variant="primary" image={{ src: (course.featured as Media)?.url ?? "/placeholder.png", alt: course.title, size: 200, objectFit: 'cover' }} className={styles.card} link={`/courseos/${course.slug}`}>
            <CardContent className={styles.cardContent}>
                <CardHeader>{course.title}</CardHeader>
                <Categories categories={course.categories?.slice(0, 1) as Category[]} />
                <CardFooter style={{ marginTop: 'auto' }}>Publicado a {DateTime.fromISO(course.createdAt).setLocale('pt-PT').toLocaleString()}</CardFooter>
            </CardContent>
        </Card>
    )
}
