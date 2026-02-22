/* * */

import { next } from '@tmlmobilidade/eslint'

/* * */

export default [

  ...next,

  {
    ignores: [
      '.next/',
      'public/',
      'assets/',
      'public/',
      'node_modules/',
      'src/app/(payload)/',
    ],
  },

]
