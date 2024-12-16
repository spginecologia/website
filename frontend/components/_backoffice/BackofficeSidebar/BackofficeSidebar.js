'use client';

/* * */

import { SpgLogoIcon } from '@/assets/spg';
import AppAuthenticationCheck from '@/components/AppAuthenticationCheck/AppAuthenticationCheck';
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconAward, IconBooks, IconBrandYoutube, IconBulb, IconCalendarEvent, IconCash, IconChartPie, IconFileCheck, IconFlower, IconLink, IconListSearch, IconLogout2, IconMessageHeart, IconNews, IconSchool, IconUsers } from '@tabler/icons-react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import styles from './BackofficeSidebar.module.css';

/* * */

const SIDEBAR_LINKS = [
	{ auth_permission: 'view', auth_scope: 'statistics', icon: <IconChartPie />, key: 'statistics', path: '/admin' },
	{ auth_permission: 'view', auth_scope: 'news', icon: <IconNews />, key: 'news', path: '/admin/news' },
	{ auth_permission: 'view', auth_scope: 'agenda', icon: <IconCalendarEvent />, key: 'agenda', path: '/admin/agenda' },
	{ auth_permission: 'view', auth_scope: 'videos', icon: <IconBrandYoutube />, key: 'videos', path: '/admin/videos' },
	{ auth_permission: 'view', auth_scope: 'guidelines', icon: <IconFileCheck />, key: 'guidelines', path: '/admin/guidelines' },
	{ auth_permission: 'view', auth_scope: 'publications', icon: <IconBooks />, key: 'publications', path: '/admin/publications' },
	{ auth_permission: 'view', auth_scope: 'courses', icon: <IconSchool />, key: 'courses', path: '/admin/courses' },
	{ auth_permission: 'view', auth_scope: 'awards', icon: <IconAward />, key: 'awards', path: '/admin/awards' },
	{ auth_permission: 'view', auth_scope: 'grants', icon: <IconBulb />, key: 'grants', path: '/admin/grants' },
	{ auth_permission: 'view', auth_scope: 'topics', icon: <IconListSearch />, key: 'topics', path: '/admin/topics' },
	{ auth_permission: 'view', auth_scope: 'links', icon: <IconLink />, key: 'links', path: '/admin/links' },
	{ auth_permission: 'view', auth_scope: 'testimonials', icon: <IconMessageHeart />, key: 'testimonials', path: '/admin/testimonials' },
	{ auth_permission: 'view', auth_scope: 'tributes', icon: <IconFlower />, key: 'tributes', path: '/admin/tributes' },
	{ auth_permission: 'view', auth_scope: 'users', icon: <IconUsers />, key: 'users', path: '/admin/users' },
	{ auth_permission: 'view', auth_scope: 'payments', icon: <IconCash />, key: 'payments', path: '/admin/payments' },
];

/* * */

export default function BackofficeSidebar() {
	//

	//
	// A. Setup variables

	const params = useParams();
	const pathname = usePathname();
	const t = useTranslations('BackofficeSidebar');

	//
	// B. Transform data

	const isActivePage = (path) => {
		if (path === '' && pathname === '') {
			return false;
		}
		else if (path === '/admin' && pathname === `/${params.locale}/admin`) {
			return true;
		}
		else if (path !== '/admin' && pathname !== `/${params.locale}/admin`) {
			return pathname.includes(path);
		}
	};

	//
	// C. Handle actions

	const handleLogout = () => {
		signOut();
	};

	//
	// D. Render components

	return (
		<div className={styles.container}>
			<Link className={styles.logo} href="/">
				<SpgLogoIcon />
			</Link>
			<div className={styles.navWrapper}>
				{SIDEBAR_LINKS.map(item => (
					<AppAuthenticationCheck key={item.key} permission={item.auth_permission} scope={item.auth_scope}>
						<Tooltip label={t(item.key)} position="right">
							<Link href={item.path}>
								<ActionIcon className={`${styles.navButton} ${isActivePage(item.path) && styles.selected}`} color="gray" size="xl">
									{item.icon}
								</ActionIcon>
							</Link>
						</Tooltip>
					</AppAuthenticationCheck>
				))}
				<Tooltip label="Logout" position="right">
					<ActionIcon className={styles.navButton} color="red" onClick={handleLogout} size="xl">
						<IconLogout2 />
					</ActionIcon>
				</Tooltip>
			</div>
		</div>
	);

	//
}
