"use client"

import { PropertySearchCard } from "./property-search-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const sampleProperties = [
  {
    id: "1",
    title: "Beautiful Mountain Home",
    price: "$485,000",
    url: "/home/tn/knoxville/123-mountain-view-dr/37919/home/1",
    status: "For Sale",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
        alt: "Beautiful Mountain Home"
      }
    ],
    address: {
      street: "123 Mountain View Dr",
      city: "Knoxville",
      state_abbr: "TN",
      zip: "37919"
    },
    details: {
      bedrooms: 4,
      bathrooms: 3,
      squareFeet: 2850
    }
  },
  {
    id: "2",
    title: "Modern Downtown Condo",
    price: "$325,000",
    url: "/home/tn/knoxville/456-market-st/37902/home/2",
    status: "For Sale",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop",
        alt: "Modern Downtown Condo"
      }
    ],
    address: {
      street: "456 Market St",
      city: "Knoxville",
      state_abbr: "TN",
      zip: "37902"
    },
    details: {
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1200
    }
  },
  {
    id: "3",
    title: "Suburban Family Home",
    price: "$395,000",
    url: "/home/tn/johnson-city/789-oak-tree-ln/37601/home/3",
    status: "For Sale",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=2070&auto=format&fit=crop",
        alt: "Suburban Family Home"
      }
    ],
    address: {
      street: "789 Oak Tree Ln",
      city: "Johnson City",
      state_abbr: "TN",
      zip: "37601"
    },
    details: {
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1950
    }
  },
  {
    id: "4",
    title: "Cozy Gatlinburg Cabin",
    price: "$550,000",
    url: "/home/tn/gatlinburg/321-smoky-ridge-rd/37738/home/4",
    status: "For Sale",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop",
        alt: "Cozy Gatlinburg Cabin"
      }
    ],
    address: {
      street: "321 Smoky Ridge Rd",
      city: "Gatlinburg",
      state_abbr: "TN",
      zip: "37738"
    },
    details: {
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1800
    }
  }
]

export const SearchResults = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 p-4 border-b">
        <p className="text-sm text-muted-foreground">
          {sampleProperties.length} of 24 homes
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-0">
          {sampleProperties.map((property) => (
            <PropertySearchCard key={property.id} property={property} />
          ))}
        </div>
      </div>
      
      <div className="flex-shrink-0 p-4 border-t bg-white">
        <div className="flex justify-between items-center">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">Page 1 of 6</span>
          <Button variant="outline" size="sm">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}