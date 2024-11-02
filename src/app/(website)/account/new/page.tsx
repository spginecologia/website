import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@/payload.config"
import RequestNew from "@/components/account/request-new";

export default async function Page() {
    const payload = await getPayloadHMR({ config })
	const account = await payload.findGlobal({
		slug: 'account',
	});
    
    return (
        <RequestNew title="Novo Sócio SPG" blockTitle="Torne-se Sócio SPG" buttonsText="Já sou sócio SPG" account={account} />
    )
}
