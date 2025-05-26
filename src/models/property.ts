import { formatPrice } from "@/lib/format-price"
import route from "@/lib/routes"
import {
  Feature,
  Property as PropertyType,
  Location as LocationType,
  Media,
  Agent,
} from "@/payload-types"
import slugify from "slugify"

export class Property {
  constructor(readonly data: PropertyType) {}

  get id(): string {
    return this.data.id
  }

  get title(): string {
    return this.data.title
  }

  get description(): PropertyType["description"] {
    return this.data.description
  }

  get photos(): PropertyType["photos"] {
    return this.data.photos as Media[]
  }

  get listingStatus(): PropertyType["listingStatus"] {
    return this.data.listingStatus
  }

  get price(): string {
    return formatPrice(this.data.price)
  }

  get address(): PropertyType["address"] {
    return this.data.address
  }

  get agent(): Agent {
    return this.data.agent as Agent
  }

  get details() {
    return {
      bedrooms: this.data.details?.bedrooms,
      bathrooms: this.data.details?.bathrooms,
      squareFeet: this.data.details?.squareFeet?.toLocaleString(),
      lotSize: this.data.details?.lotSize?.toLocaleString(),
      yearBuilt: this.data.details?.yearBuilt,
    }
  }

  get features(): Feature[] {
    if (!this.data.features) return []
    const features = this.data.features as Feature[]
    return features
  }

  get url(): string {
    const location = this.data.location as LocationType
    const fullAddress = [this.data.street, location.city, location.state_abbr, location.zip].map(
      (l) => slugify(`${l}`, { lower: true }),
    )

    console.log({ fullAddress })

    return route("property.show", {
      id: this.data.id,
      full_address: fullAddress.join("/"),
    })
  }
}
