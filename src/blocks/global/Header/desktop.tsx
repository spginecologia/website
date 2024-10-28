'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './desktop.module.css';
import { Header, Media } from '@/payload-types';
import { IoSearchSharp } from "react-icons/io5";
import { IoMenuSharp } from "react-icons/io5";
import { PiUserCircleFill } from "react-icons/pi";
import { IoCloseSharp } from "react-icons/io5";

export default function Component({ header }: { header: Header }) {
	const [isClient, setIsClient] = useState(false);
	const pathname = usePathname();
	const [isHovered, setIsHovered] = useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [linksMenu, setLinksMenu] = useState(false);

	console.log(windowWidth)

	useEffect(() => {
		setIsClient(true);

		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};
	  
		window.addEventListener('resize', handleResize);
	  
		handleResize();
	  
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);


	const pathnames = isClient && pathname ? pathname.split("/").filter((x) => x) : [];

	const getLabelForPath = (segmentPath: string) => {
		const matchingItem = header.navigationItems?.find((item) => item.url === segmentPath);
		return matchingItem ? matchingItem.label : segmentPath.split("/").pop() || '';
	};

	return (
		<>
			<nav className={styles.nav}>
				<div className={styles.container}>
					<div className={styles.logo}>
						<Link href={'/'}>
							<Image
								alt={(header.logo as Media)?.alt ?? ""}
								height={40}
								src={`http://localhost:3000${(header.logo as Media)?.url}`}
								width={120}
							/>
						</Link>
					</div>
					{windowWidth >= 1200 && 
						<div className={styles.links}>
							{header.navigationItems?.map((item) => (
								<Link key={item.label} href={item.url}>
									{item.label}
								</Link>
							))}
							<Link href={'/academia/topicos/'} className={styles.search}>
								<IoSearchSharp size={20} />
							</Link>
						</div>
					}
					{windowWidth >= 1200 ? 
						(

							<div className={styles.academyWrapper}>
								<div
									className={styles.dropdownAcademy}
									onMouseEnter={() => setIsHovered(true)}
									onMouseLeave={() => setIsHovered(false)}
									>
									<Image
										alt={(header.academiaDropdownLogo as Media)?.alt ?? ""}
										height={19}
										src={`http://localhost:3000${(header.academiaDropdownLogo as Media)?.url}`}
										width={190}
									/>
									<div
										className={`${styles.dropdownContent} ${
										isHovered ? styles.visible : styles.hidden
										}`}
									>
										{header.academyDropdownMenu?.map((item) =>
											<Link href={`/${item.url}`} className={styles.dropdownItem} key={item.id}>
												<Image
													alt={(item.logo as Media)?.alt ?? ""}
													src={`http://localhost:3000${(item.logo as Media)?.url}`}
													height={30}
													width={30}
												/>
												<span>
													{item.label}
												</span>
											</Link>
										)}
									</div>
								</div>
								<div className={styles.login}>
									<Link href={'/account'}>
										Login
									</Link>
								</div>
							</div>
						) :
						(
							<div className={styles.mobile}>
								<Link href={'/academia/topicos/'}>
									<IoSearchSharp size={35} />
								</Link>
								<Link href={'/account'}>
									<PiUserCircleFill size={35} />
								</Link>
								<div onClick={() => setLinksMenu(true)}>
									<IoMenuSharp size={35} />
								</div>
							</div>
						)
					}
				</div>
			</nav>
			<div className={styles.breadcrumbsWrapper}>
				<div className={styles.breadcrumbs}>
					<Link href={'/'}>
						Home
					</Link>
					{pathnames.map((segment, index) => {
						const routeTo = `${pathnames.slice(0, index + 1).join("/")}`;
						const label = getLabelForPath(routeTo);
						return (
							<>
								{' › '}
								<Link href={routeTo}>{label}</Link>
							</>
						);
					})}
				</div>
			</div>
			{linksMenu && 
				(<>
					<div className={styles.closeMenu} onClick={() => setLinksMenu(false)}>
						<IoCloseSharp size={50} />
					</div>
					<div className={styles.mobileMenu}>
						{header.navigationItems?.map((item) => (
							<Link key={item.label} href={item.url}>
								{item.label}
							</Link>
						))}
					</div>
				</>)
			}
		</>
	);
}
