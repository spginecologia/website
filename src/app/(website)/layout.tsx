import Footer from '@/blocks/global/Footer';
import Header from '@/blocks/global/Header';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import '@/styles/fonts.css';
import '@/styles/globals.css';
import '@/styles/variables.css';


import { MantineProvider } from '@mantine/core';


export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-PT">
			<body>
				<MantineProvider>
					<Header />
					{children}
					<Footer />
				</MantineProvider>
			</body>
		</html>
	)
}