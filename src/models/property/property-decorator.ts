import { Feature, Media, Property } from "@/payload-types"
import slugify from "slugify"
import route from "@/lib/routes"
import { ListingStatus } from "@/config/collections/Properties/listing-status-map"
import { formatPrice } from "@/lib/format-price"
import { BaseDecorator } from "../base-decorator"
export type DecoratedPhoto = {
  id: number
  url: string | null
  alt: string
}
export class PropertyDecorator extends BaseDecorator<Property> {
  get url(): string {
    const data = this.original
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

  get features(): Feature[] {
    if (!this.original.features) return []
    const features = this.original.features as Feature[]
    return features
  }

  get price(): string {
    return formatPrice(this.original.price)
  }

  get address(): Property["address"] {
    return this.original.address
  }

  get photos(): DecoratedPhoto[] {
    const photos = (this.original.photos ?? []) as Media[]
    const decoratedPhotos = photos
      .filter((p) => !!p.url)
      .map((photo) => {
        return {
          id: photo.id,
          url: photo.url!,
          alt: photo.alt,
        }
      })

    return decoratedPhotos
  }

  get details() {
    return {
      bedrooms: this.original.details?.bedrooms ?? 0,
      bathrooms: this.original.details?.bathrooms ?? 0,
      squareFeet: this.original.details?.squareFeet?.toLocaleString() ?? "0",
      lotSize: this.original.details?.lotSize?.toLocaleString() ?? "0",
      yearBuilt: this.original.details?.yearBuilt ?? 0,
      propertyType: this.original.details?.propertyType,
      heatingType: this.original.details?.heatingType,
    }
  }

  get listingStatus(): ListingStatus {
    return this.original.listingStatus
  }
  get agent() {
    return this.original.agent
  }
}
