'use client';

import styles from './styles.module.css';
import { Media, VideosPage } from '@/payload-types';
import Image from 'next/image';
import React from 'react';

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
	videosPage: VideosPage
}

export default function Banner({ videosPage }: BannerProps) {

	return (
		<div className={styles.wrapper}>
            <Image className={styles.image} alt={(videosPage.image as Media)?.alt ?? ""} src={(videosPage.image as Media)?.url ?? "/placeholder.png"} width={(videosPage.image as Media)?.width ?? 833} height={(videosPage.image as Media)?.height ?? 280} />
			<Image className={styles.logo} alt={(videosPage.logo_right as Media)?.alt ?? ""} src={(videosPage.logo_right as Media)?.url ?? "/placeholder.png"} width={250} height={25} />
		</div>
	);
}
