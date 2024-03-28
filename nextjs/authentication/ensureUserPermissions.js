/* * */

import { UserDefault } from '@/schemas/User/default';

/* * */

export default function ensureUserPermissions(permissionsData) {
  //

  // 1.
  // Make a copy of the permissions object

  const formattedPermissions = { ...permissionsData };

  // 2.
  // Verify permissions for each scope

  if (!formattedPermissions?.news?.view?.is_allowed) formattedPermissions.news = UserDefault.permissions.news;
  if (!formattedPermissions?.agenda?.view?.is_allowed) formattedPermissions.agenda = UserDefault.permissions.agenda;
  if (!formattedPermissions?.videos?.view?.is_allowed) formattedPermissions.videos = UserDefault.permissions.videos;
  if (!formattedPermissions?.guidelines?.view?.is_allowed) formattedPermissions.guidelines = UserDefault.permissions.guidelines;
  if (!formattedPermissions?.publications?.view?.is_allowed) formattedPermissions.publications = UserDefault.permissions.publications;
  if (!formattedPermissions?.courses?.view?.is_allowed) formattedPermissions.courses = UserDefault.permissions.courses;
  if (!formattedPermissions?.topics?.view?.is_allowed) formattedPermissions.topics = UserDefault.permissions.topics;
  if (!formattedPermissions?.testimonials?.view?.is_allowed) formattedPermissions.testimonials = UserDefault.permissions.testimonials;
  if (!formattedPermissions?.tributes?.view?.is_allowed) formattedPermissions.tributes = UserDefault.permissions.tributes;
  if (!formattedPermissions?.users?.view?.is_allowed) formattedPermissions.users = UserDefault.permissions.users;
  if (!formattedPermissions?.admin?.view?.is_allowed) formattedPermissions.admin = UserDefault.permissions.admin;

  // 3.
  // Return the formatted permissions object

  return formattedPermissions;

  //
}
