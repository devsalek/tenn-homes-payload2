import { seedZipCodes } from './seeders/zipcodes'
import { getPayload } from 'payload'
import config from '../payload.config'
async function seed() {
  console.log('Seeding database...')

  const payload = await getPayload({ config })

  // clear all collections
  await payload.delete({
    collection: 'zipcodes',
    where: {},
  })

  console.log('Clearing zipcodes collection first...')

  await seedZipCodes(payload)
}

seed()
  .then(() => {
    console.log('Database seeded successfully')
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
