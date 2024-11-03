
import { getPayloadHMR } from "@payloadcms/next/utilities"
import config from "@/payload.config"
import { NewVideo } from "@/components/videos/New";

export default async function Page() {
    const payload = await getPayloadHMR({ config })
	const newVideoPage = await payload.findGlobal({
		slug: 'newVideoPage',
	});

    return (
        <NewVideo image={newVideoPage} />
    )
}
