

import { getPayload } from 'payload';
import config from "@/payload.config"
import RequestNew from "@/components/account/request-new";
import Edit from "@/components/account/edit";

export default async function Page() {
    const payload = await getPayload({ config })
	const account = await payload.findGlobal({
		slug: 'account',
	});

    return (
        <Edit title="Edite as suas informações" account={account} />
    )
}
