import { Inquiry as InquiryType } from "@/payload-types"
import { CollectionSlug } from "payload"
import { BaseModel } from "../base-model"
import { InquiryDecorator } from "./inquiry-decorator"

/**
 * Inquiry Model
 * This class represents the Inquiry model, extending the BaseModel.
 */
export class Inquiry extends BaseModel<InquiryType, InquiryDecorator> {
  static collectionSlug: CollectionSlug = "inquiries"
  static decoratorClass = InquiryDecorator
}
