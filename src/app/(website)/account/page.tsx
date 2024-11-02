import Account from "@/components/account";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@/payload.config"

export default async function Page() {
    const payload = await getPayloadHMR({ config })
	const account = await payload.findGlobal({
		slug: 'account',
	});
    
    return (
        <Account account={account} />
    )
}
