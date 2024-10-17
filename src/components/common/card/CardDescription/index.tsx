import classNames from 'classnames';
import React from 'react';

import styles from './styles.module.css';

type CardHeaderProps = React.HTMLAttributes<HTMLHeadingElement>;

export default function CardHeader({ children, className, ...props }: CardHeaderProps) {
	return <p className={classNames(styles.container, className)} {...props}>{children}</p>;
}
