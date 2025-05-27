import { PropertyModel } from "@/models/property/property-model"

export default async function TestPage() {
  const properties = await PropertyModel.where()
  console.log("Properties:", properties)

  const property = properties[0] // Assuming you want to log the first property
  console.log("First Property:", property)

  return (
    <div>
      <pre>{JSON.stringify(property.data, null, 2)}</pre>
    </div>
  )
}
