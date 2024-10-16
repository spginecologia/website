import { getPayload } from "payload"
import config from '@payload-config'
import data from './data/member.json'

const seed = async () => {
    console.log('🌱 Seeding members')
    const payload = await getPayload({ config })

    try {
        for (const item of data) {
            await payload.create({
                collection: 'members',
                data: {
                    title: item.title.rendered,
                    profile_picture: "6710052a95e3cff04007c104",
                    position: item.acf.membro_position,
                    location: item.acf.membro_location,
                },
            })
        }
    } catch (error) {
        console.error(error)
    }
}

seed()
    .then(() => console.log('🚀 Members seeded'))
    .catch((error) => console.error(error))
    .finally(() => process.exit(0))