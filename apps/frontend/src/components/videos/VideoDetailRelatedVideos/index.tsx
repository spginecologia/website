'use client';

/* * */

import { Video } from '@/payload-types';

import styles from './styles.module.css';

import { VideoCardRelated } from '../VideoCardRelated';

/* * */

interface Props {
	list?: Video[]
}

/* * */

export function VideoDetailRelatedVideos({ list }: Props) {
	//

	//
	// A. Fetch data

	return (
		<div className={styles.container}>
			{list?.map(item => (
				<VideoCardRelated
  key={item.id}
  authors={item.authors}
  coverSrc={typeof item.featured_image === 'object' ? item?.featured_image?.url : undefined}
  duration={item.video_file && typeof item.video_file === 'object' ? item.video_file.duration : undefined}
  href={`/academia/videos/${item.id}`}
  title={item.title}
				/>
			))}
		</div>
	);

	//
}
