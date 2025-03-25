/* * */

import { Avatar, Space } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface Props {
	city?: null | string
	name?: null | string
	photoSrc?: null | string
	position?: null | string
	separatedFromNext?: boolean | null
}

/* * */

export function SocietySocialBodiesMember({ city, name, photoSrc, position, separatedFromNext }: Props) {
	//

	//
	// A. Setup variables

	//
	// B. Render components

	return (
		<>
			<div className={styles.container}>
				<Avatar size={65} src={photoSrc} />
				<div className={styles.memberInfo}>
					{position && <p className={styles.position}>{position}</p>}
					<div className={styles.nameAndCityWrapper}>
						<p className={styles.name}>{name || '-'}</p>
						<p className={styles.city}>{city || '-'}</p>
					</div>
				</div>
			</div>
			{separatedFromNext && <Space h="xs" />}
		</>
	);

	//
}
