"use client"

import { Input } from "@/components/ui/input"
import { Filter, Search, SlidersIcon } from "lucide-react"
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
import { FilterStatus } from "./filters/status"
import { useSearchResults } from "@/app/(frontend)/(search)/search-results-provider"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SearchFilterKeys } from "@/lib/search-utils"
import { FilterType } from "./filters/type"

export const SearchHeader = () => {
  const {
    updateSearch,
    searchCriteria: { filters },
  } = useSearchResults()

  return (
    <div className="bg-white border-b h-20 flex items-center justify-center">
      <div className="flex items-center gap-4 w-full max-w-6xl px-4">
        <div className="flex-1 relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="City, Address, ZIP"
            className="pl-10 h-12 border-gray-300 md:text-base w-full"
          />
        </div>

        <div>
          <Filters />
        </div>
      </div>
    </div>
  )
}

const Filters = () => {
  const router = useRouter()

  const {
    searchResults,
    searchCriteria: { filters },
    updateSearch,
  } = useSearchResults()

  const updateFilter = () => {
    const url = updateSearch({ filters: { ...filters, "property-status": status } })
    router.push(url)
  }

  const handleFilterApply = (filter: SearchFilterKeys) => {
    return (value: string) => {
      const newFilters = { ...filters, [filter]: value }
      setFilterState(newFilters)
      const newUrl = updateSearch({ filters: newFilters })
      router.push(newUrl)
    }
  }

  const handleFilterChange = (filter: SearchFilterKeys) => {
    return (value: string) => {
      const newFilters = { ...filters, [filter]: value }
      setFilterState(newFilters)
    }
  }

  const [filterState, setFilterState] = useState<Record<SearchFilterKeys, any>>(filters)
  return (
    <div>
      <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
        <FilterStatusPopover>
          <FilterStatus value={filterState["property-status"]} onChange={handleFilterChange} />
        </FilterStatusPopover>
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
              <div className="grid gap-3">
                <h3 className="font-semibold">Property Status</h3>
                <FilterStatus value={filterState["property-status"]} onChange={handleFilterApply} />
              </div>
              <div className="grid gap-3">
                <h3 className="font-semibold">Property Type</h3>
                <FilterType value={filterState["property-type"]} onChange={handleFilterApply} />
              </div>
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
