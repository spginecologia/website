/* * */

import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@/payload.config'
import Desktop from './Desktop';
import Mobile from './Mobile';
import Breadcrumbs from './Breadcrumbs';
import styles from './styles.module.css';
import { BreakpointerSwitch } from '@/components/common/Breakpointer';

export default async function Component() {
	const payload = await getPayloadHMR({ config })
	const header = await payload.findGlobal({
		slug: 'header',
	});

	return (
		<>
			<nav className={styles.nav}>
				<BreakpointerSwitch
					desktop={<Desktop header={header} />}
					mobile={<Mobile header={header} />}
				/>
			</nav>
			<Breadcrumbs header={header} />
		</>
	);
}
