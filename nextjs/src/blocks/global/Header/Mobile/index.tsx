'use client';

import { IoCloseSharp, IoMenuSharp } from "react-icons/io5";

import Link from 'next/link';
import styles from './styles.module.css';
import { IoSearchSharp } from 'react-icons/io5';
import { PiUserCircleFill } from 'react-icons/pi';
import { Header, Media } from '@/payload-types';
import { useState } from "react";
import Image from 'next/image';

export default function Mobile({ header }: { header: Header }) {
    const [linksMenu, setLinksMenu] = useState(false);

    return <>
        <div className={styles.container}>
            <div className={styles.logo}>
                <Link href={'/'}>
                    <Image
                        alt={(header.logo as Media)?.alt ?? ""}
                        height={40}
                        src={(header.logo as Media)?.url ?? "/placeholder.png"}
                        width={120}
                    />
                </Link>
            </div>
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
}