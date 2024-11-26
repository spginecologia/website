import Footer from '@/blocks/Footer';
import { Header } from '@/blocks/header/Header';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@/styles/fonts.css';
import '@/styles/globals.css';
import '@/styles/variables.css';
import '@/styles/defaults.css';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-PT">
			<body>
				<MantineProvider>
					<NuqsAdapter>
						<Header />
						{children}
						<Footer />
					</NuqsAdapter>
				</MantineProvider>
			</body>
		</html>
	);
}
