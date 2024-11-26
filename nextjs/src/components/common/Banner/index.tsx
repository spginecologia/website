'use client';

import { Media, VideosPage } from '@/payload-types';
import Image from 'next/image';
import React from 'react';

import styles from './styles.module.css';

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
	videosPage: VideosPage
}

export default function Banner({ videosPage }: BannerProps) {
	return (
		<div className={styles.wrapper}>
			<Image alt={(videosPage.image as Media)?.alt ?? ''} className={styles.image} height={(videosPage.image as Media)?.height ?? 280} src={(videosPage.image as Media)?.url ?? '/placeholder.png'} width={(videosPage.image as Media)?.width ?? 833} />
			<Image alt={(videosPage.logo_right as Media)?.alt ?? ''} className={styles.logo} height={25} src={(videosPage.logo_right as Media)?.url ?? '/placeholder.png'} width={250} />
		</div>
	);
}
