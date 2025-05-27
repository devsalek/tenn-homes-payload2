import { Contact as ContactType } from "@/payload-types"
import { CollectionSlug } from "payload"
import { BaseModel } from "../base-model"
import { ContactDecorator } from "./contact-decorator"

/**
 * Contact Model
 * This class represents the Contact model, extending the BaseModel.
 */
export class Contact extends BaseModel<ContactType, ContactDecorator> {
  static collectionSlug: CollectionSlug = "contacts"
  static decoratorClass = ContactDecorator

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
