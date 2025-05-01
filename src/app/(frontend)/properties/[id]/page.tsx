import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PropertyWithAddress } from '@/config/collections/Properties/Properties'
import config from '@payload-config'
import { getPayload } from 'payload'

export default async function PropertiesPage({ params }: { params: { id: string } }) {
  const payload = await getPayload({ config })
  const { id } = await params
  const property = (await payload.findByID({
    collection: 'properties',
    id,
  })) as PropertyWithAddress
  return (
    <div className="w-screen p-12 flex justify-center bg-accent text-sm">
      <div className="w-full max-w-lg grid gap-4">
        <Card className="gap-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{property.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex flex-row gap-1">
              <p>{property.address.street},</p>
              <p>{property.address.city}</p>
              <p>{property.address.state_abbr},</p>
              <p>{property.address.zip}</p>
            </div>
            <div className="flex flex-row gap-3">
              <h3 className="font-bold">Features</h3>
              <ul>
                {property.features?.map((feature) => {
                  if (typeof feature === 'number') return null
                  return <li key={feature.id}>{feature.name}</li>
                })}
              </ul>
            </div>
          </CardContent>
        </Card>
        <pre className="font-mono text-xs bg-amber-950/10 p-6 rounded-2xl">
          {JSON.stringify(property, null, 2)}
        </pre>
      </div>
    </div>
  )
}
