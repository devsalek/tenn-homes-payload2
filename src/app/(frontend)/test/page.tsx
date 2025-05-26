import { PropertyModel } from "@/models/property-model"

export default async function TestPage() {
  const properties = await PropertyModel.where()
  console.log("Properties:", properties)

  const property = properties[0] // Assuming you want to log the first property
  console.log("First Property:", property)

  return (
    <div>
      <pre>{JSON.stringify(property.original, null, 2)}</pre>
    </div>
  )
}
