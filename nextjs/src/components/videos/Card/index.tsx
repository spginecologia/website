'use client'

import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';
import React, { useState } from 'react';
import { incrementViewCount } from '@/functions/incrementViews';
import { Media, Video } from '@/payload-types';

/* * */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	children?: React.ReactNode
	direction?: 'column' | 'row'
	link?: string
	target?: "_blank" | "_self"
	variant: 'default' | 'primary' | 'transparent'
	video: Video
	small: boolean;
}

export default function Card({
	children,
	className,
	direction = 'column',
	link,
	target = "_self",
	variant,
	video,
	small,
	...props
}: CardProps) {
	const router = useRouter();
	const handleClick = async (video: Video) => {
		incrementViewCount(video);

		if (link) {
			if (target === "_blank") {
				window.open(link, target);
			} else {
				router.push(link);
			}
		}
	};

	const renderCardContent = () => (
		<>
			<div className={styles.imageWrapper}>
				<Image
					alt={(video.featured as Media)?.alt ?? ""}
					className={styles.image}
					height={200}
					src={(video.featured as Media)?.url ?? "/placeholder.png"}
					style={{ objectFit: 'cover', width: '100%' }}
					width={200}
				/>
				<span className={styles.duration}>{video.video_file_length}</span>
				<span className={styles.views}>{video.views} VISUALIZAÇÕES</span>
			</div>
			{!small && <div className={styles.areaInterest}>{video.video_section}</div>}
			{children}
		</>
	);

	return (
		<div
			aria-label="Card"
			className={classNames(
				styles[variant],
				small ? '' : styles.small,
				styles.card,
				styles[direction],
				link && styles.link,
				className,
			)}
			{...props}
			onClick={() => handleClick(video)}
		>
			{small && <div className={styles.areaInterest}>{video.video_section}</div>}
			{renderCardContent()}
		</div>
	);
}
