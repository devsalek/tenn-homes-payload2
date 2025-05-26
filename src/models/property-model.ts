import { Property } from "@/payload-types"
import { CollectionSlug } from "payload"
import { BaseModel } from "./base-model"
import { PropertyDecorator } from "./property-decorator"

export class PropertyModel extends BaseModel<Property, PropertyDecorator> {
  static collectionSlug: CollectionSlug = "properties"
  static decoratorClass = PropertyDecorator
}
