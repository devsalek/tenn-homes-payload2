"use client"

import { Search, SlidersIcon } from "lucide-react"
import { FilterStatusPopover } from "./filters/status-popover"
import { FilterTypePopover } from "./filters/type-popover"
import { FilterBedsBaths } from "./filters/beds-baths"
import { FilterPrice } from "./filters/price"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { useSearchResults } from "@/app/(frontend)/(search)/search-results-provider"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { Autosuggest } from "../autosuggest"

export const SearchHeader = () => {
  const router = useRouter()

  const { locationInputValue, setFilters } = useSearchResults()

  return (
    <div className="bg-white border-b h-20 flex items-center justify-center">
      <div className="flex items-center gap-4 w-full max-w-7xl px-4">
        <div className="flex-1 w-1/2 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Autosuggest
            type="text"
            placeholder="City, Address, ZIP"
            defaultValue={locationInputValue}
            className="pl-10 h-12 border-gray-300 md:text-base w-full"
            onChange={(value) => {
              if (!value) {
                setFilters({
                  city: undefined,
                  zip: undefined,
                })
              }
            }}
            onSelect={(suggestion) => {
              if (suggestion.type === "address") {
                router.push(suggestion.url)
              }
              const key =
                suggestion.type === "city" ? "city" : suggestion.type === "zip" ? "zip" : null
              if (!key) return
              const otherKey = key === "city" ? "zip" : "city"
              setFilters({
                [key]: suggestion.value,
                [otherKey]: undefined,
              })
            }}
          />
        </div>

        <div className="w-1/2">
          <Filters />
        </div>
      </div>
    </div>
  )
}

const Filters = () => {
  const { searchResults } = useSearchResults()

  return (
    <div>
      <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
        <FilterStatusPopover />
        <FilterTypePopover />
        <FilterBedsBaths />
        <FilterPrice />
      </div>
      <div className="lg:hidden flex">
        <Sheet>
          <SheetTrigger>
            <SlidersIcon />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Adjust your search criteria</SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-4 p-4">
              Placeholder
              <SheetClose asChild>
                <Button type="button" variant="outline" className="w-full">
                  See {searchResults.totalDocs} homes
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
