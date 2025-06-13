import { Badge } from "@/components/ui/badge"
import { BathIcon, BedDoubleIcon, RulerIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { PropertyDecorator } from "@/repository/property/property-decorator"

interface PropertySearchCardProps {
  property: PropertyDecorator
}

export const PropertySearchCard = ({ property }: PropertySearchCardProps) => {
  const featureImage = property.photos[0] ?? {
    url: "https://placehold.co/400x300",
    alt: property.title,
  }

  return (
    <Link
      href={property.url}
      className="group block border rounded-lg hover:bg-gray-50 transition-colors overflow-hidden"
    >
      <div className="">
        <div className="flex flex-col">
          <div className="relative flex-shrink-0">
            <Image
              src={featureImage.url!}
              alt={featureImage.alt}
              width={120}
              height={90}
              className="object-cover w-full aspect-video"
            />
            <div className="absolute top-2 left-2">
              <Badge variant="secondary" className="bg-white/90 text-foreground text-xs">
                {property.listingStatus}
              </Badge>
            </div>
          </div>

          <div className="flex-1 min-w-0 p-4">
            <div className="space-y-2">
              <div>
                <h3 className="font-semibold text-lg text-primary">{property.price}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {property.address.street}, {property.address.city}, {property.address.state_abbr}{" "}
                  {property.address.zip}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <BedDoubleIcon size={14} />
                  {property.details.bedrooms} beds
                </span>
                <span className="flex items-center gap-1">
                  <BathIcon size={14} />
                  {property.details.bathrooms} baths
                </span>
                <span className="flex items-center gap-1">
                  <RulerIcon size={14} />
                  {property.details.squareFeet?.toLocaleString()} sqft
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
