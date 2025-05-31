import { Media, Property, Agent, Feature } from "@/payload-types"
import slugify from "slugify"
import route from "@/lib/routes"
import { formatPrice } from "@/lib/format-price"
import { ListingStatus } from "@/config/collections/Properties/listing-status-map"
import { generateUrl } from "./generate-url"

type PropertyPhoto = {
  id: Media["id"]
  url: Media["url"]
  alt: Media["alt"]
}

export class PropertyDecorator {
  constructor(public data: Property) {}

  get id(): Property["id"] {
    return this.data.id
  }

  get title(): Property["title"] {
    return this.data.title
  }

  get description(): Property["description"] {
    return this.data.description
  }

  get url(): string {
    return generateUrl(this.data)
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
      Property: this.data.details?.propertyType,
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
