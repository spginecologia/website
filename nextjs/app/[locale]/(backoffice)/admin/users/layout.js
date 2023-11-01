/* * */

import AuthGate from '@/components/AuthGate/AuthGate';
import BackofficeWrapperLayout from '@/components/BackofficeWrapperLayout/BackofficeWrapperLayout';
import BackofficeUsersList from '@/components/BackofficeUsersList/BackofficeUsersList';

/* * */

export default function Layout({ children }) {
  return (
    <AuthGate scope="users" permission="view" redirect>
      <BackofficeWrapperLayout list={<BackofficeUsersList />} page={children} />
    </AuthGate>
  );
}
