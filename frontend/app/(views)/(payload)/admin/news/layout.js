/* * */

import AppAuthenticationCheck from '@/components/AppAuthenticationCheck/AppAuthenticationCheck';
import BackofficeWrapperLayout from '@/components/BackofficeWrapperLayout/BackofficeWrapperLayout';
import BackofficeNewsList from '@/components/BackofficeNewsList/BackofficeNewsList';

/* * */

export default function Layout({ children }) {
  return (
    <AppAuthenticationCheck scope="users" permission="view" redirect>
      <BackofficeWrapperLayout list={<BackofficeNewsList />} page={children} />
    </AppAuthenticationCheck>
  );
}
