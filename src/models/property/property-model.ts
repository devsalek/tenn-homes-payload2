import { Property } from "@/payload-types"
import { CollectionSlug } from "payload"
import { BaseModel } from "../base-model"
import slugify from "slugify"
import route from "@/lib/routes"

export class PropertyModel extends BaseModel<Property> {
  static collectionSlug: CollectionSlug = "properties"
  get url(): string {
    const data = this.data
    const fullAddress = [
      data.address.street,
      data.address.city,
      data.address.state_abbr,
      data.address.zip,
    ].map((l) => slugify(`${l}`, { lower: true }))

    return route("property.show", {
      id: data.id,
      full_address: fullAddress.join("/"),
    })
  }
}
