import { PropertyModel } from "@/models/base-model"

export default async function TestPage() {
  const property = await PropertyModel.find("150111858d7a8bd7")
  const properties = await PropertyModel.where({
    agent: {
      equals: {
        id: "150111858d7a8bd7",
      },
    },
  })
  console.log("Property:", property)
  console.log("Properties:", properties)

  return (
    <div>
      <h1>Test Page</h1>
      <p>This is a test page to verify the setup.</p>
    </div>
  )
}
