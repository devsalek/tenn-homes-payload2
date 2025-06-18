"use client"

import { PropertyDecorator } from "@/repository/property/property-decorator"
import { formatPrice } from "@/lib/format-price"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Bed, Bath, Square, ExternalLink } from "lucide-react"
import { listingStatusMap } from "@/config/collections/Properties/listing-status-map"
import { propertyTypeMap } from "@/config/collections/Properties/property-type-options"
import Link from "next/link"
import Image from "next/image"

interface PropertyPopupProps {
  property: PropertyDecorator
  onClose: () => void
  position: { lat: number; lng: number }
}

export const PropertyPopup = ({ property, onClose, position }: PropertyPopupProps) => {
  const details = property.original.details
  const photos = property.original.photos as any[]
  const firstPhoto = photos?.[0]
  const status = property.original.listingStatus
  const propertyType = details?.propertyType

  return (
    <div className="bg-white rounded-lg shadow-lg border w-80 overflow-hidden -translate-x-1/2 translate-y-8">
      {/* Header with close button */}
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center gap-2">
          {status && (
            <Badge variant={status === "forsale" ? "default" : "secondary"}>
              {listingStatusMap[status]?.label}
            </Badge>
          )}
          {propertyType && <Badge variant="outline">{propertyTypeMap[propertyType]?.label}</Badge>}
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Property image */}
      {firstPhoto && (
        <div className="relative h-48">
          <Image
            src={typeof firstPhoto === "object" ? firstPhoto.url || "" : ""}
            alt={property.original.title}
            fill
            className="object-cover"
            sizes="(max-width: 320px) 320px, 320px"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Price */}
        <div className="text-2xl font-bold text-primary">
          {property.original.price ? formatPrice(property.original.price) : "Price on Request"}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg leading-tight">{property.original.title}</h3>

        {/* Address */}
        <p className="text-sm text-muted-foreground">{property.original.address.full_address}</p>

        {/* Property details */}
        {details && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {details.bedrooms && (
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>
                  {details.bedrooms} bed{details.bedrooms !== 1 ? "s" : ""}
                </span>
              </div>
            )}
            {details.bathrooms && (
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>
                  {details.bathrooms} bath{details.bathrooms !== 1 ? "s" : ""}
                </span>
              </div>
            )}
            {details.squareFeet && (
              <div className="flex items-center gap-1">
                <Square className="h-4 w-4" />
                <span>{details.squareFeet.toLocaleString()} sqft</span>
              </div>
            )}
          </div>
        )}

        {/* Description preview */}
        {property.original.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {property.original.description}
          </p>
        )}

        {/* View details button */}
        <Button asChild className="w-full">
          <Link href={property.url}>
            <ExternalLink className="h-4 w-4 mr-2" />
            View Details
          </Link>
        </Button>
      </div>
    </div>
  )
}
