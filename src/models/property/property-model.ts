import { CollectionSlug } from "payload"
import { Property } from "@/payload-types"
import { ActiveRecord } from "../base-model"
import { generateUrl } from "./generate-url"

export class PropertyModel extends ActiveRecord<Property> {
  override collection: CollectionSlug = "properties"

  get url(): string {
    return generateUrl(this.getAttributes())
  }
}
