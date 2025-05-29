import { Inquiry as InquiryType } from "@/payload-types"
import { CollectionSlug } from "payload"
import { ActiveRecord } from "../base-model"

/**
 * Inquiry Model
 * This class represents the Inquiry model, extending the BaseModel.
 */
export class InquiryModel extends ActiveRecord<InquiryType> {
  override collection: CollectionSlug = "inquiries"
}
