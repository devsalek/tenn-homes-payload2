import { CollectionSlug } from "payload"
import { Property as PropertyType } from "@/payload-types"
import { ActiveRecord } from "../base-model"
import { PropertyDecorator } from "./property-decorator"

export class PropertyModel extends ActiveRecord<PropertyType> {
  override collection: CollectionSlug = "properties"

  get url() {
    return "asdasd"
  }

  decorated(): PropertyDecorator {
    return new PropertyDecorator(this.getAttributes())
  }
}
