'use client';

import { IoCloseSharp, IoMenuSharp } from "react-icons/io5";

import Link from 'next/link';
import styles from './styles.module.css';
import { IoSearchSharp } from 'react-icons/io5';
import { PiUserCircleFill } from 'react-icons/pi';
import { Header } from '@/payload-types';
import { useState } from "react";

export default function Mobile({ header }: { header: Header }) {
    const [linksMenu, setLinksMenu] = useState(false);

    return <>
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