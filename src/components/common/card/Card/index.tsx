import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */

interface ImageProps {
	alt: string
	size: number
	src: string
	objectFit?: 'contain' | 'cover'
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	children?: React.ReactNode
	direction?: 'column' | 'row'
	image?: ImageProps
	link?: string
	variant?: 'default' | 'primary'
}

export default function Card({ children, className, direction = 'column', image, link, variant = 'default', ...props }: CardProps) {
	const renderCardContent = () => {
		return (
			<>
				{image && (
					<Image
						alt={image.alt}
						className={styles.image}
						height={image.size}
						src={image.src}
						style={{ objectFit: image.objectFit ?? 'contain', width: '100%' }}
						width={image.size}
					/>
				)}

				<div className={styles.content}>{children}</div>
			</>
		);
	};
	return (
		<div aria-label="Card" className={classNames(styles.card, styles[variant], styles[direction], className)} {...props}>
			{link
				? (
					<Link href={link ?? '#'} style={{ cursor: link ? 'pointer' : 'default' }} className={styles.link}>
						{renderCardContent()}
					</Link>
				)
				: renderCardContent()
			}
		</div>
	);
}
