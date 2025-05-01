import { PropertyWithAddress } from '@/config/collections/Properties/Properties'
import { Zipcode } from '@/payload-types'
import config from '@payload-config'
import { getPayload } from 'payload'

export default async function PropertiesPage({ params }: { params: { id: string } }) {
  const payload = await getPayload({ config })
  const property = (await payload.findByID({
    collection: 'properties',
    id: params.id,
  })) as PropertyWithAddress
  // property.location.city
  //   property.location.zip...
  return (
    <div>
      <h1 className="text-xl font-bold">{property.title}</h1>
      <p>{/* 5325 Roberts Rd, Corryton, TN 37721 */}</p>
      <p>{property.address.street} </p>
      <p>{property.address.city}</p>
      <p>{property.address.state_abbr}</p>
      <p>{property.address.zip}</p>
      <pre>{JSON.stringify(property, null, 2)}</pre>
    </div>
  )
}
