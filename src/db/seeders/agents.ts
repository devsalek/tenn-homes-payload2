import { specializations } from "@/config/helpers/specializations"
import { faker } from "@faker-js/faker"
import { Payload } from "payload"

export const seedAgents = async (payload: Payload) => {
  const media = await payload.find({
    collection: "media",
    where: {
      filename: {
        contains: "agent",
      },
    },
    limit: 100,
  })

  const profilePhoto = () => faker.helpers.arrayElement(media.docs).id

  Array.from({ length: 10 }).forEach(async (_, i) => {
    await payload.create({
      collection: "agents",
      data: {
        email: `agent${i}@example.com`,
        password: "agent123",
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        phone: faker.phone.number(),
        contact_email: faker.internet.username() + "@example.com",
        licenses: [
          {
            license_number: faker.string.uuid(),
            state: "TN",
          },
        ],
        title: faker.person.jobTitle(),
        profilePhoto: profilePhoto(),
        specializations: faker.helpers.arrayElements(specializations).map((s) => s.value),
      },
    })
  })
}
