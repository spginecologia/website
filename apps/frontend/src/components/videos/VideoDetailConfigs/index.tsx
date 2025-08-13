'use client';

/* * */

import { AuthWall } from '@/components/auth/AuthWall';
import { Anchor } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface VideoDetailConfigsProps {
	videoId?: null | string
}

/* * */

export function VideoDetailConfigs({ videoId }: VideoDetailConfigsProps) {
	//

	if (!videoId) {
		return null;
	}

	return (
		<AuthWall roles={['admin', 'video-manager']} invisible>
			<div className={styles.container}>
				<Anchor href={`/admin/collections/videos/${videoId}`} target="_blank">Editar no Backoffice</Anchor>
			</div>
		</AuthWall>
	);

	//
}
