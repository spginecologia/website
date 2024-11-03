import { getPayload } from "payload"
import config from '@payload-config'
import data from './data/sections.json'
import categoriesMap from './data/categories-map.json'
import { convertStringToLexical } from "./utils"

const seed = async () => {
    console.log('🌱 Seeding premios')
    const payload = await getPayload({ config })

    throw new Error('Not implemented')

    for (const item of data) {
        try {
        } catch (error) {
            console.error(JSON.stringify(error, null, 2))
        }
    }
}

seed()
    .then(() => console.log('🚀 Premios seeded'))
    .catch((error) => console.error(error))
    .finally(() => process.exit(0))