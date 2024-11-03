/* * */

import classNames from 'classnames';
import Link from 'next/link';

import styles from './styles.module.css';

/* * */
interface Props extends React.HTMLAttributes<HTMLDivElement> {
	height?: number
	label?: string
	link?: string
	width?: number
}

export default function Component({ className, height, label, link, width, ...props }: Props) {
	const renderContent = () => (
		<div className={classNames(styles.circle, className)} style={{ height, maxHeight: height, maxWidth: width, width }} {...props}>
			<span>{label}</span>
		</div>
	);

	return link ? (
		<Link href={link || '#'} style={{ textDecoration: 'none' }}>
			{renderContent()}
		</Link>
	) : renderContent();
}
