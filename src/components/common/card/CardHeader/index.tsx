import classNames from 'classnames';
import React from 'react';

import styles from './styles.module.css';

interface CardHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
	variant?: 'default' | 'primary' | 'secondary'
}

export default function CardHeader({ children, className, variant = 'default', ...props }: CardHeaderProps) {
	return <h4 className={classNames(styles.container, styles[variant], className)} {...props}>{children}</h4>;
}
