/* * */

import { next } from '@tmlmobilidade/eslint'

/* * */

export default [

  ...next,

  {
	rules: {
		"@typescript-eslint/naming-convention": "off"
	}
  },

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
