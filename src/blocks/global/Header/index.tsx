/* * */

import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@/payload.config'
import Header from './desktop';

export default async function Component() {
	const payload = await getPayloadHMR({config})
	const header = await payload.findGlobal({
		slug: 'header',
	});

	return (
		<>
			<Header header={header} />
		</>
	);
}
