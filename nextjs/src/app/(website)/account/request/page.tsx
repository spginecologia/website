
import { getPayload } from 'payload';
import config from "@/payload.config"
import RequestNew from "@/components/account/request-new";

export default async function Page() {
    const payload = await getPayload({ config })
	const account = await payload.findGlobal({
		slug: 'account',
	});

    return (
        <RequestNew  title="A sua conta SPG" blockTitle="Active a sua conta SPG" buttonsText="Tornar-me Sócio SPG" account={account} />
    )
}
