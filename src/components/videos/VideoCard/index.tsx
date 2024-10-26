import { Card, CardContent, CardFooter, CardHeader } from "@/components/common/card";
import { Category, Media, Video } from "@/payload-types";

import styles from "./styles.module.css"
import RichText from "@/components/common/RichText";
import Categories from "@/components/common/Categories";

export function VideoCard({ video }: { video: Video }) {
    return <Card variant="primary" image={{ src: (video.featured as Media)?.url ?? "/placeholder.png", alt: video.title, size: 200, objectFit: 'cover' }} className={styles.card} link={`/academia/videos/${video.slug}`}>
        <CardContent>
            <Categories categories={(video.categories as Category[]) ?? []} />
            <div className={styles.imageWrapper}>
                {/* <img src={(video.featured as Media)?.url ?? "/placeholder.png"} alt={video.title} className={styles.image} /> */}
                <span className={styles.duration}>3:30</span>
                <span className={styles.views}>230 VISUALIZAÇÕES</span>
            </div>
            <CardHeader>{video.title}</CardHeader>
            <div className={styles.authors}>{video.video_authors}</div>
            <RichText content={video.video_description} />
        </CardContent>
    </Card>
}
