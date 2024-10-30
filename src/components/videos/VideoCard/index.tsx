import { Card, CardContent, CardHeader } from "@/components/common/card";
import { Media, Video } from "@/payload-types";

import styles from "./styles.module.css"
import RichText from "@/components/common/RichText";
import { formatDate } from "@/functions/formatDate";



export function VideoCard({ video, variant, small }: { video: Video, variant: 'default' | 'primary' | 'transparent', small: boolean }) {
    return (
        <Card small={small} variant={variant} video={video} className={styles.card} link={`/academia/videos/${video.slug}`}>
            <CardContent>
                <CardHeader className={styles.title}>{video.title}</CardHeader>
                <div className={styles.authors}>{video.video_authors}</div>
                {small && <RichText content={video.video_description} className={styles.description} />}
                {!small && <div className={styles.createdAt}>Publicado a {formatDate(video.createdAt)}</div>}
            </CardContent>
        </Card>
    )
}
