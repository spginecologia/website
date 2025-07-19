/* * */

import { CoverLogo } from '@/components/CoverLogo';
import { Footer } from '@/components/Footer';
import { Body, Container, Head, Html, Preview } from '@react-email/components';
import { type PropsWithChildren } from 'react';

import styles from './styles';

/* * */

interface WrapperProps {
	previewMessage: string
}

/* * */

export function Wrapper({ children, previewMessage }: PropsWithChildren<WrapperProps>) {
	return (
		<Html>
			<Head />
			<Body style={styles.body}>
				<Preview>{previewMessage}</Preview>
				<Container style={styles.container}>
					<CoverLogo />
					<Container style={styles.content}>
						{children}
					</Container>
					<Footer />
				</Container>
			</Body>
		</Html>
	);
};

/* * */

export default Wrapper;
