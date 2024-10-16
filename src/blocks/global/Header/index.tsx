/* * */

import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@/payload.config'
import DesktopHeader from './desktop';
// import MobileHeader from '@/components/navigation/MobileHeader';

export default async function Component() {
	const payload = await getPayloadHMR({config})
	const header = await payload.findGlobal({
		slug: 'header',
	})
	return (
		<>
			<DesktopHeader header={header} />
			{/* <MobileHeader /> */}
		</>
	);
}
