
import { getPayload } from 'payload'
import config from "@/payload.config"
import { NewVideo } from "@/components/videos/New";

export default async function Page() {
    const payload = await getPayload({ config })
	const newVideoPage = await payload.findGlobal({
		slug: 'newVideoPage',
	});

    return (
        <NewVideo image={newVideoPage} />
    )
}
