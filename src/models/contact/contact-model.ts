import { Contact as ContactType } from "@/payload-types"
import { CollectionSlug } from "payload"
import { ActiveRecord } from "../base-model"

/**
 * Contact Model
 * This class represents the Contact model, extending the BaseModel.
 */
export class ContactModel extends ActiveRecord<ContactType> {
  override collection: CollectionSlug = "contacts"

  findOrCreate = async (data: Partial<ContactType>) => {
    const contacts = await this.findMany({
      where: { email: { equals: data.email } },
    })

    if (contacts.docs.count() > 0) {
      return contacts.docs.first()
    } else {
      return await this.create(data as Omit<ContactType, "id" | "updatedAt" | "createdAt">)
    }
  }
}
