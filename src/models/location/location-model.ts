import { Location } from "@/payload-types"
import { CollectionSlug } from "payload"
import { BaseModel } from "../base-model"

export class LocationModel extends BaseModel<Location> {
  static collectionSlug: CollectionSlug = "locations"
}
