import Account from '@/components/account';
import config from '@/payload.config';
import { getPayload } from 'payload';

export default async function Page() {
	const payload = await getPayload({ config });
	const account = await payload.findGlobal({
		slug: 'account',
	});

	return <Account account={account} />;
}
