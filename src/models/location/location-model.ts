import { Location } from "@/payload-types"
import { CollectionSlug } from "payload"
import { BaseModel } from "../base-model"
import { LocationDecorator } from "./location-decorator"

export class LocationModel extends BaseModel<Location, LocationDecorator> {
  static collectionSlug: CollectionSlug = "locations"
  static decoratorClass = LocationDecorator
}
