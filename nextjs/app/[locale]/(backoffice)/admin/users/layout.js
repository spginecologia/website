/* * */

import AppAuthenticationCheck from '@/components/AppAuthenticationCheck/AppAuthenticationCheck';
import BackofficeWrapperLayout from '@/components/BackofficeWrapperLayout/BackofficeWrapperLayout';
import BackofficeUsersList from '@/components/BackofficeUsersList/BackofficeUsersList';

/* * */

export default function Layout({ children }) {
  return (
    <AppAuthenticationCheck scope="users" permission="view" redirect>
      <BackofficeWrapperLayout list={<BackofficeUsersList />} page={children} />
    </AppAuthenticationCheck>
  );
}
