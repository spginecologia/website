/* * */

import config from '@/payload.config';
import { getPayload } from 'payload';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './styles.module.css';

/* * */

export async function HeaderBreadcrumbs() {
	//

	const pathname = usePathname();

	const payload = await getPayload({ config });
	const header = await payload.findGlobal({
		slug: 'header',
	});

	const pathnames = pathname ? pathname.split('/').filter(x => x) : [];

	const getLabelForPath = (segmentPath: string) => {
		const matchingItem = header.navigationItems?.find(item => item.url === segmentPath);
		return matchingItem ? matchingItem.label : segmentPath.split('/').pop() || '';
	};

	return (
		<div className={styles.container}>
			<Link href="/">
				Home
			</Link>
			{pathnames.map((_, index) => {
				const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
				const label = getLabelForPath(routeTo);
				return (
					<>
						<span className={styles.separator}>{'>'}</span>
						<Link href={routeTo}>{label}</Link>
					</>
				);
			})}
		</div>
	);

	//
}
