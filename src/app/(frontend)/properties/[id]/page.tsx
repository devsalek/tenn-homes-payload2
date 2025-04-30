import { Property } from '@/payload-types'
import config from '@payload-config'
import { getPayload } from 'payload'

interface PropertyWithAddress extends Property {
  address: {
    street: string
    city: string
    state_abbr: string
    state_name: string
    zip: string
  }
}

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
      <p>
        {/* 5325 Roberts Rd, Corryton, TN 37721 */}
        <span className="font-semibold">{property.address.street}</span>,{' '}
        <span>{property.address.city}</span>, <span>{property.address.state_abbr}</span>
        <span>{property.address.zip}</span>
      </p>
      <pre>{JSON.stringify(property, null, 2)}</pre>
    </div>
  )
}
