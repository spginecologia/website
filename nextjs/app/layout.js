/* * */

import '@/styles/reset.css';
import '@/styles/defaults.css';

/* * */

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';

/* * */

import Providers from './providers';
import { ColorSchemeScript } from '@mantine/core';

/* * */

export const metadata = {
  metadataBase: process.env.VERCEL_URL ? new URL(`https://${process.env.VERCEL_URL}`) : new URL(`http://0.0.0.0:${process.env.PORT || 3000}`),
  title: 'SPG | Sociedade Portuguesa de Ginecologia',
  description: '',
};

/* * */

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <ColorSchemeScript />
        <link rel="stylesheet" href="https://use.typekit.net/xgs1heq.css" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
