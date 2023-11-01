'use client';

/* * */

import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';

/* * */

export default async function Layout({ children, params: { locale } }) {
  //

  let messages;
  try {
    messages = (await import(`../../translations/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  //updateInterval={1}
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Lisbon" now={Date.now()}>
      {children}
    </NextIntlClientProvider>
  );
}
