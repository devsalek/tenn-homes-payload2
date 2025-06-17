"use client"
import { useSearchResults } from "@/app/(frontend)/(search)/search-results-provider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  ListingStatus,
  listingStatusMap,
  listingStatusOptions,
} from "@/config/collections/Properties/listing-status-map"
import { PopoverClose } from "@radix-ui/react-popover"
import { ChevronDownIcon, XIcon } from "lucide-react"

export function FilterStatusPopover() {
  const {
    searchResults,
    setFilters,
    filters: { propertyStatus },
  } = useSearchResults()

  const label = propertyStatus ? (
    <span className="font-semibold text-cyan-800">{listingStatusMap[propertyStatus].label}</span>
  ) : (
    "Status"
  )

  return (
    <Popover>
      <div className="relative">
        {propertyStatus && (
          <Button
            variant="ghost"
            size={"sm"}
            onClick={setFilters.bind(null, {
              "property-status": undefined,
            })}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-2 text-cyan-800"
          >
            <XIcon size={16} strokeWidth={3} />
          </Button>
        )}
        <PopoverTrigger asChild>
          <Button className="h-12 flex items-center justify-between gap-2 w-42" variant={"outline"}>
            <span>{label}</span>
            {!propertyStatus ? (
              <span className="ml-2">
                <ChevronDownIcon size={16} />
              </span>
            ) : (
              <span className="w-6"></span>
            )}
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-96">
        <RadioGroup
          className="grid grid-cols-2 gap-2 mb-4"
          value={propertyStatus}
          onValueChange={(value) => {
            const newValue = value === "any" ? undefined : (value as ListingStatus)

            setFilters({ "property-status": newValue })
          }}
        >
          {listingStatusOptions.map((option) => (
            <Label
              htmlFor={option.value}
              key={option.value}
              className="has-data-[state=checked]:bg-amber-50 has-data-[state=checked]:text-amber-900 ring  has-data-[state=checked]:ring-2 ring-border has-data-[state=checked]:ring-amber-600 flex items-center justify-center gap-1 border rounded-md px-6 py-3 hover:bg-gray-100 cursor-pointer"
            >
              <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
              <div>{option.label}</div>
            </Label>
          ))}
        </RadioGroup>
        <PopoverClose asChild>
          <Button type="button" size={"lg"} className="w-full">
            See {searchResults.totalDocs} homes
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  )
}
