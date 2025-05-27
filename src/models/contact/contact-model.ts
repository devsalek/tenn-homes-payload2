import { Contact as ContactType } from "@/payload-types"
import { CollectionSlug } from "payload"
import { BaseModel } from "../base-model"

/**
 * Contact Model
 * This class represents the Contact model, extending the BaseModel.
 */
export class Contact extends BaseModel<ContactType> {
  static collectionSlug: CollectionSlug = "contacts"

  static findOrCreate = async (data: Partial<ContactType>) => {
    const contacts = await Contact.where({
      email: { equals: data.email },
    })

    if (contacts.length > 0) {
      return contacts[0]
    } else {
      return await Contact.create(data as Omit<ContactType, "id" | "updatedAt" | "createdAt">)
    }
  }
}
