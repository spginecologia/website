/* * */
import Image from 'next/image';

import styles from './styles.module.css';

/* * */
export default function Component({ member }: { member: Member }) {
	return (
		<div className={styles.container}>
			<div className={styles.image}>
				<Image
					alt={member.name}
					height={60}
					src={member.photo}
					width={60}
				/>
			</div>
			<div className={styles.nameWrapper}>
				<span className={styles.title}>{member.role}</span>
				<span className={styles.name}>{member.name} <span className={styles.location}>{member.location}</span></span>
			</div>
		</div>
	);
}
