/* * */

import { withAuth } from 'next-auth/middleware';
import { availableLocales } from '@/translations/config';
import createIntlMiddleware from 'next-intl/middleware';

/* * */

const PUBLIC_PAGES = [
  //
  '/',
  '/society',
  '/sections',
  '/sections/*',
  '/workgroups',
  '/workgroups/*',
  '/brand',
  '/privacy',
  //
  '/news',
  '/news/*',
  //
  '/agenda',
  '/agenda/*',
  //
  '/academia',
  '/academia/videos',
  '/academia/guidelines',
  '/academia/guidelines/*',
  '/academia/publications',
  '/academia/courses',
  '/academia/topics',
  '/academia/topics/*',
  //
  '/login',
  '/login/verify',
  '/login/error',
  '/agenda',
  //
  '/links',
  //
];

/* * */

const intlMiddleware = createIntlMiddleware({ locales: availableLocales, defaultLocale: 'pt', localePrefix: 'as-needed' });

const authMiddleware = withAuth((req) => intlMiddleware(req));

/* * */

export default function middleware(req) {
  const LOCALE_REGEX = `(/(${availableLocales.join('|')}))`;
  const PUBLIC_PAGES_REGEX = PUBLIC_PAGES.map((page) => page.replace('*', '.*')).join('|');
  const publicPathnameRegex = RegExp(`^${LOCALE_REGEX}?(${PUBLIC_PAGES_REGEX})/?$`, 'i');
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return authMiddleware(req);
  }
}

/* * */

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
