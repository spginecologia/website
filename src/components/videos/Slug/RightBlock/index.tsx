import { Media, Video } from "@/payload-types";
import styles from './styles.module.css'
import { formatDate } from "@/functions/formatDate";
import Link from "next/link";
import Image from "next/image";

export default function RightBlock({ video, videos }: { video: Video, videos: Video[] }) {
    return (
        <div className={styles.rightBlock}>
            <div className={styles.videoStats}>
                <div className={styles.top}>
                    <div className={styles.stats}>
                        <label className={styles.label}>Visualizações</label>
                        <span className={styles.stat}>{video.views}</span>
                    </div>
                    <div className={styles.stats}>
                        <label className={styles.label}>Data de Publicação</label>
                        <span className={styles.stat}>{formatDate(video.createdAt)}</span>
                    </div>
                </div>
                <div className={styles.stats}>
                    <label className={styles.label}>Tópicos</label>
                    <span className={styles.stat}>
                        {video.categories?.map((item) => 
                            typeof item === 'object' && 'name' in item ? <Link href={`/category/${item.slug}`} key={item.id}>{item.name}</Link> : item
                        )}
                    </span>
                </div>
            </div>
            <div className={styles.admin}>
                <button className={styles.publishedButton}>Vídeo publicado</button>
                <button className={styles.refuseVideo}>Recusar vídeo</button>
            </div>
            <div className={styles.featuredVideos}>
                {videos.slice(0, 3).map((item) => 
                    <div key={item.id} className={styles.smallVideoWrapper}>
                        <div className={styles.imageWrapper}>
                            <Image 
                                alt={(item.featured as Media)?.alt ?? ""}
                                height={73}
                                src={(item.featured as Media)?.url ?? "/placeholder.png"}
                                width={125}
                            />
                            <div className={styles.fileLength}>{item.video_file_length}</div>
                        </div>
                        <div>
                            <div className={styles.imageTitle}>
                                {item.title}
                            </div>
                            <div className={styles.imageAuthors}>
                                {item.video_authors}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
