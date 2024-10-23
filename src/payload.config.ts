// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { EXPERIMENTAL_TableFeature, FixedToolbarFeature, HTMLConverterFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { pt } from 'payload/i18n/pt'


/* * */
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import News from './collections/News'
import Consensos from './collections/Consensos'
import Categories from './collections/Categories'
import Publications from './collections/Publications'
import Course from './collections/Course'
import Sections from './collections/Sections'
import Nucleos from './collections/Nucleos'
import Members from './collections/Members'
import Videos from './collections/Videos'
import Prizes from './collections/Prizes'
import Footer from './collections/global/Footer'
import Header from './collections/global/Header'
import Events from './collections/Event'
import Pages from './collections/Pages'
/* * */

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Pages,
    Events,
    Users,
    Media,
    Categories,
    Consensos,
    News,
    Publications,
    Course,
    Sections,
    Nucleos,
    Members,
    Videos,
    Prizes,
  ],
  globals: [
    Header,
    Footer,
  ],
  i18n: {
    supportedLanguages: { pt }
  },
  editor: lexicalEditor({
    admin: { hideGutter: true },
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      FixedToolbarFeature(),
      EXPERIMENTAL_TableFeature(),
      HTMLConverterFeature({
        converters: ({ defaultConverters }) => [...defaultConverters],
      }),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [],
})
