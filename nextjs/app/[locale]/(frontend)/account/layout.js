/* * */

import AccountExplorer from '@/components/AccountExplorer/AccountExplorer';

/* * */

export default function Layout({ profile, payments, videos }) {
  return (
    <AccountExplorer>
      {profile}
      {payments}
      {videos}
    </AccountExplorer>
  );
}
