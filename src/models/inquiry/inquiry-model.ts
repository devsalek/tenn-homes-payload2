import { Inquiry as InquiryType } from "@/payload-types"
import { CollectionSlug } from "payload"
import { BaseModel } from "../base-model"

/**
 * Inquiry Model
 * This class represents the Inquiry model, extending the BaseModel.
 */
export class Inquiry extends BaseModel<InquiryType> {
  static collectionSlug: CollectionSlug = "inquiries"
}
