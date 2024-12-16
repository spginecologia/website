/* * */

import { next } from '@carrismetropolitana/eslint'

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
      'app/(payload)/',
    ],
  },
]
