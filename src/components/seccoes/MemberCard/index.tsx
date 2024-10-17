/* * */

import Image from 'next/image';

import styles from './styles.module.css';
import { Media, Member } from '@/payload-types';

/* * */
export default function Component({ member }: { member: any }) {
	return (
		<div className={styles.container}>
			<div className={styles.image}>
				<Image
					alt={member.title}
					height={60}
					src={(member.profile_picture as Media)?.url ?? ""}
					width={60}
				/>
			</div>
			<div className={styles.nameWrapper}>
				<span className={styles.title}>{member.position}</span>
				<span className={styles.name}>{member.name} <span className={styles.location}>{member.location}</span></span>
			</div>
		</div>
	);
}
