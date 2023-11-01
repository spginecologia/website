'use client';

/* * */

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

/* * */

export default function Layout({ children }) {
  //

  const router = useRouter();

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push(`/login?callbackUrl=${window.location.pathname}`);
    },
  });

  return <div style={{ backgroundColor: 'beige' }}>{children}</div>;
}
