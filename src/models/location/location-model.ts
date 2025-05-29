import { Location } from "@/payload-types"
import { CollectionSlug } from "payload"
import { ActiveRecord } from "../base-model"

export class LocationModel extends ActiveRecord<Location> {
  override collection: CollectionSlug = "locations"
}
