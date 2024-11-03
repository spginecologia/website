"use client"

import { Grid } from "@/components/layout/Grid";
import CourseCard from "../CourseCard";
import { Course } from "@/payload-types";

export default function CoursesList({ courses }: { courses: Course[] }) {
    return <Grid columns="ab" gap="lg">
        {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
        ))}
    </Grid>
}