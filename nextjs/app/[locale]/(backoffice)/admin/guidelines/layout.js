/* * */

import AuthGate from '@/components/AuthGate/AuthGate';
import BackofficeWrapperLayout from '@/components/BackofficeWrapperLayout/BackofficeWrapperLayout';
import BackofficeGuidelinesList from '@/components/BackofficeGuidelinesList/BackofficeGuidelinesList';

/* * */

export default function Layout({ children }) {
  return (
    <AuthGate scope="users" permission="view" redirect>
      <BackofficeWrapperLayout list={<BackofficeGuidelinesList />} page={children} />
    </AuthGate>
  );
}
