'use client';

/* * */

import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import AppWrapper from '@/components/AppWrapper/AppWrapper';

/* * */

export default async function LocaleLayout({ children, params: { locale } }) {
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
      <AppWrapper>{children}</AppWrapper>
    </NextIntlClientProvider>
  );
}
