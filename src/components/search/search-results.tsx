import { PropertySearchCard } from "./property-search-card"
import { Button } from "@/components/ui/button"
import { local } from "@/repository"
import { ChevronLeft, ChevronRight } from "lucide-react"

export const SearchResults = async () => {
  const properties = await local.property.getAll()
  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 p-4 border-b">
        <p className="text-sm text-muted-foreground">{properties.length} of 24 homes</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
          {properties.map((property) => (
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
