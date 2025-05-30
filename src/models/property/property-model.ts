import { CollectionSlug } from "payload"
import { Agent, Feature, Media, Property, Property as PropertyType } from "@/payload-types"
import { ActiveRecord } from "../base-model"
import slugify from "slugify"
import route from "@/lib/routes"
import { formatPrice } from "@/lib/format-price"
import { ListingStatus } from "@/config/collections/Properties/listing-status-map"

type PropertyPhoto = {
  id: Media["id"]
  url: Media["url"]
  alt: Media["alt"]
}

export class PropertyModel extends ActiveRecord<PropertyType> {
  override collection: CollectionSlug = "properties"

  get data(): PropertyType {
    return this.getAttributes()
  }

  get title(): PropertyType["title"] {
    return this.data.title
  }

  get description(): PropertyType["description"] {
    return this.data.description
  }

  get url(): string {
    const fullAddress = [
      this.data.address.street,
      this.data.address.city,
      this.data.address.state_abbr,
      this.data.address.zip,
    ].map((l) => slugify(`${l}`, { lower: true }))

    return route("property.show", {
      id: this.data.id,
      full_address: fullAddress.join("/"),
    })
  }

  get features(): Feature[] {
    if (!this.data.features) return []
    const features = this.data.features as Feature[]
    return features
  }

  get price(): string {
    return formatPrice(this.data.price)
  }

  get address(): Property["address"] {
    return this.data.address
  }

  get photos(): PropertyPhoto[] {
    const photoData = (this.data.photos ?? []) as Media[]
    const photos = photoData
      .filter((p) => !!p.url)
      .map((photo) => {
        return {
          id: photo.id,
          url: photo.url,
          alt: photo.alt,
        }
      })

    return photos
  }

  get details() {
    return {
      bedrooms: this.data.details?.bedrooms ?? 0,
      bathrooms: this.data.details?.bathrooms ?? 0,
      squareFeet: this.data.details?.squareFeet?.toLocaleString() ?? "0",
      lotSize: this.data.details?.lotSize?.toLocaleString() ?? "0",
      yearBuilt: this.data.details?.yearBuilt ?? 0,
      propertyType: this.data.details?.propertyType,
      heatingType: this.data.details?.heatingType,
    }
  }

  get listingStatus(): ListingStatus {
    return this.data.listingStatus
  }
  get agent(): Agent {
    return this.data.agent as Agent
  }
}
