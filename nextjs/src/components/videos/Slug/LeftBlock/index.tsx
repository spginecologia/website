import { Media, Video } from "@/payload-types";
import styles from './styles.module.css'
import RichText from "@/components/common/RichText";
import { Title } from "@mantine/core";

export default function LeftBlock({ video}: { video: Video}) {
    return (
        <div className={styles.leftBlock}>
            <video autoPlay controls className={styles.media}>
                <source src={(video.video_file as Media)?.url ?? "/placeholder.png"} type="video/mp4" />
            </video>
            <Title className={styles.title}>{video.title}</Title>
            <div className={styles.authors}>{video.video_authors}</div>
            <div className={styles.introduction}>{video.video_introduction}</div>
            <RichText content={video.video_description} className={'description'} />
        </div>
    );
}
