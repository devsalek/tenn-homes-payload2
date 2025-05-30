import { CollectionSlug } from "payload"
import { ActiveRecord } from "../base-model"
import { User } from "@/payload-types"

/**
 * User Model
 * This class represents the User model, extending the BaseModel.
 */
export class UserModel extends ActiveRecord<User> {
  override collection: CollectionSlug = "inquiries"

  email!: User["email"]
}
