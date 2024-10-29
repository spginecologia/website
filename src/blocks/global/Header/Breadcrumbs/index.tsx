'use client';

import Link from "next/link";
import styles from './styles.module.css';
import { usePathname } from "next/navigation";
import { Header } from "@/payload-types";

export default function Breadcrumbs({ header }: { header: Header }) {
    const pathname = usePathname();

    const pathnames = pathname ? pathname.split("/").filter((x) => x) : [];

    const getLabelForPath = (segmentPath: string) => {
        const matchingItem = header.navigationItems?.find((item) => item.url === segmentPath);
        return matchingItem ? matchingItem.label : segmentPath.split("/").pop() || '';
    };

    return <div className={styles.breadcrumbsWrapper}>
        <div className={styles.breadcrumbs}>
            <Link href={'/'}>
                Home
            </Link>
            {pathnames.map((_, index) => {
                const routeTo = `${pathnames.slice(0, index + 1).join("/")}`;
                const label = getLabelForPath(routeTo);
                return (
                    <>
                        <span className={styles.separator}>{'>'}</span>
                        <Link href={routeTo}>{label}</Link>
                    </>
                );
            })}
        </div>
    </div>
}
