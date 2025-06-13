"use client"

import { Badge } from "@/components/ui/badge"
import { BathIcon, BedDoubleIcon, RulerIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface PropertySearchCardProps {
  property: {
    id: string
    title: string
    price: string
    url: string
    status: string
    photos: Array<{
      url: string
      alt: string
    }>
    address: {
      street: string
      city: string
      state_abbr: string
      zip: string
    }
    details: {
      bedrooms: number
      bathrooms: number
      squareFeet: number
    }
  }
}

export const PropertySearchCard = ({ property }: PropertySearchCardProps) => {
  const featureImage = property.photos[0] ?? {
    url: "https://placehold.co/400x300",
    alt: property.title,
  }

  return (
    <Link href={property.url} className="group block border-b hover:bg-gray-50 transition-colors">
      <div className="p-4">
        <div className="flex gap-4">
          <div className="relative flex-shrink-0">
            <Image
              src={featureImage.url}
              alt={featureImage.alt}
              width={120}
              height={90}
              className="object-cover h-[90px] w-[120px] rounded-lg"
            />
            <div className="absolute top-2 left-2">
              <Badge variant="secondary" className="bg-white/90 text-foreground text-xs">
                {property.status}
              </Badge>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="space-y-2">
              <div>
                <h3 className="font-semibold text-lg text-primary">{property.price}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {property.address.street}, {property.address.city}, {property.address.state_abbr} {property.address.zip}
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