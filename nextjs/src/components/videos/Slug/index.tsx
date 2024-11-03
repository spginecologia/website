import { Video, VideosPage } from "@/payload-types";
import Banner from "@/components/common/Banner";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import LeftBlock from "./LeftBlock";
import RightBlock from "./RightBlock";

export default function Component({ video, videosPage, videos }: { video: Video, videosPage: VideosPage, videos: Video[] }) {
    return (
        <>
            <Banner videosPage={videosPage} />
            <Section>
                <Grid columns="aab" gap="lg">
                    <LeftBlock video={video} />
                    <RightBlock video={video} videos={videos} />
                </Grid>
            </Section>
        </>
    );
}
