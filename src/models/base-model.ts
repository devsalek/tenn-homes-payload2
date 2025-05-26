import { getPayloadClient } from "@/db/client"
import route from "@/lib/routes"
import { Property } from "@/payload-types"
import { CollectionSlug, Where } from "payload"
import slugify from "slugify"

export class BaseModel<T> {
  static collectionSlug: CollectionSlug
  data: T

  constructor(data: T) {
    this.data = data
  }

  static client = async () => {
    return getPayloadClient()
  }

  static async create(data: any) {
    const client = await this.client()
    const createdData = await client.create({
      collection: this.collectionSlug,
      data,
    })
    return new this(createdData)
  }

  static async find(id: string) {
    const client = await this.client()
    const data = await client.findByID({
      collection: this.collectionSlug,
      id,
    })
    return new this(data)
  }

  static async where(where: Where = {}) {
    const client = await this.client()
    const data = await client.find({
      collection: this.collectionSlug,
      where,
      limit: 100,
      depth: 0,
      pagination: false,
      sort: "-createdAt",
    })
    return data.docs.map((item) => new this(item))
  }
}

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
