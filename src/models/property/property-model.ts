import { CollectionSlug } from "payload"
import { Property as PropertyType } from "@/payload-types"
import { ActiveRecord } from "../base-model"
import { PropertyDecorator } from "./property-decorator"
import route from "@/lib/routes"
import slugify from "slugify"
import { BaseDecorator } from "../base-decorator"

export class PropertyModel extends ActiveRecord<PropertyType> {
  override collection: CollectionSlug = "properties"

  decorated(): PropertyDecorator {
    return new PropertyDecorator(this.getAttributes())
  }
}
