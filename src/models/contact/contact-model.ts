import { Contact as ContactType } from "@/payload-types"
import { CollectionSlug } from "payload"
import { ActiveRecord } from "../base-model"

/**
 * Contact Model
 * This class represents the Contact model, extending the BaseModel.
 */
export class ContactModel extends ActiveRecord<ContactType> {
  override collection: CollectionSlug = "contacts"
}
