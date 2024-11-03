import classNames from 'classnames';
import React from 'react';

import styles from './styles.module.css';

type CardFooterProps = React.HTMLAttributes<HTMLSpanElement>;

export default function CardFooter({ children, className, ...props }: CardFooterProps) {
	return <span className={classNames(styles.container, className)} {...props}>{children}</span>;
}
