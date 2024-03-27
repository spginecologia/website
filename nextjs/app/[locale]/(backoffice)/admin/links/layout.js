/* * */

import AuthGate from '@/components/AuthGate/AuthGate';
import BackofficeWrapperLayout from '@/components/BackofficeWrapperLayout/BackofficeWrapperLayout';
import BackofficeLinksList from '@/components/BackofficeLinksList/BackofficeLinksList';

/* * */

export default function Layout({ children }) {
  return (
    <AuthGate scope="users" permission="view" redirect>
      <BackofficeWrapperLayout list={<BackofficeLinksList />} page={children} />
    </AuthGate>
  );
}
