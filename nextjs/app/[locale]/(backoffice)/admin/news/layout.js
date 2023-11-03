/* * */

import AuthGate from '@/components/AuthGate/AuthGate';
import BackofficeWrapperLayout from '@/components/BackofficeWrapperLayout/BackofficeWrapperLayout';
import BackofficeNewsList from '@/components/BackofficeNewsList/BackofficeNewsList';

/* * */

export default function Layout({ children }) {
  return (
    <AuthGate scope="news" permission="view" redirect>
      <BackofficeWrapperLayout list={<BackofficeNewsList />} page={children} />
    </AuthGate>
  );
}
