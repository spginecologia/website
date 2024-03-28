/* * */

import { UserDefault } from '@/schemas/User/default';

/* * */

export const UserOptions = {
  //

  /*
   * TITLE
   */

  title: ['Sr.', 'Sr.ª', 'Dr.', 'Dr.ª', 'Prof.', 'Prof.ª', 'Exmo.', 'Exmo.ª'],

  /*
   * PERMISSIONS PRESETS
   */

  permissions_presets: {
    candidate: UserDefault.permissions,
    member: {
      ...UserDefault.permissions,
      videos: { ...UserDefault.permissions.videos, view: { is_allowed: true }, upload: { is_allowed: true }, create_edit_own: { is_allowed: true } },
      publications: { ...UserDefault.permissions.publications, view: { is_allowed: true } },
      courses: { ...UserDefault.permissions.courses, view: { is_allowed: true } },
    },
    admin: {
      ...UserDefault.permissions,
      videos: { ...UserDefault.permissions.videos, view: { is_allowed: true }, upload: { is_allowed: true }, create_edit_own: { is_allowed: true } },
      publications: { ...UserDefault.permissions.publications, view: { is_allowed: true } },
      courses: { ...UserDefault.permissions.courses, view: { is_allowed: true } },
    },
  },

  //
};
