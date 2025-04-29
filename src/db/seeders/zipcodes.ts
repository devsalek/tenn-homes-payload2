import csv from 'csv-parser'
import fs from 'fs'
import path, { dirname } from 'path'
import { Payload } from 'payload'
import { fileURLToPath } from 'url'

export async function seedZipCodes(payload: Payload) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const csvFilePath = path.resolve(__dirname, './zip_codes.csv')
  console.log(csvFilePath)

  const zipCodes: any[] = []

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data: any) => {
        // Filter by target counties
        zipCodes.push({
          code: Number(data.code),
          city: data.city,
          state_abbr: data.state_abbr,
          state_name: 'Tennessee',
          county: data.county,
          latitude: Number(data.latitude),
          longitude: Number(data.longitude),
          est_population: Number(data.est_population),
        })
      })
      .on('end', () => {
        console.log(zipCodes[0])
        console.log(`Found ${zipCodes.length} zip codes in target counties`)
        resolve()
      })
      .on('error', (error: Error) => {
        console.error('Error reading CSV file:', error)
        reject(error)
      })
  })

  for (const zipCode of zipCodes) {
    await payload.create({
      collection: 'zipcodes',
      data: zipCode,
    })
  }
}
