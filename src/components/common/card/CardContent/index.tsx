import classNames from 'classnames';

import styles from './styles.module.css';

export default function CardContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={classNames(styles.container, className)} {...props}>{children}</div>;
}
