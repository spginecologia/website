import Footer from '@/blocks/global/Footer';
import Header from '@/blocks/global/Header';
import '@/styles/fonts.css';
import '@/styles/globals.css';
import '@/styles/variables.css';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-PT">
			<body>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
    )   
}