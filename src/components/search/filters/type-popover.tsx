"use client"
import { useSearchResults } from "@/app/(frontend)/(search)/search-results-provider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  PropertyType,
  propertyTypeMap,
  PropertyTypeOption,
  propertyTypeOptions,
} from "@/config/collections/Properties/property-type-options"
import { PopoverClose } from "@radix-ui/react-popover"
import { ChevronDownIcon, XIcon } from "lucide-react"

import { ApartmentIcon } from "@/components/icons/apartment"
import { CastleIcon } from "@/components/icons/castle"
import { CondoIcon } from "@/components/icons/condo"
import { HouseIcon } from "@/components/icons/house"
import { LandIcon } from "@/components/icons/land"
import { MobileHomeIcon } from "@/components/icons/mobile-home"
import { TownhouseIcon } from "@/components/icons/townhouse"

const iconMap: Record<PropertyType, React.ComponentType> = {
  "single-family": HouseIcon,
  "multi-family": ApartmentIcon,
  condo: CondoIcon,
  townhouse: TownhouseIcon,
  land: LandIcon,
  "mobile-home": MobileHomeIcon,
  other: CastleIcon,
}

export function FilterTypePopover() {
  const {
    searchResults,
    setFilters,
    filters: { propertyType },
  } = useSearchResults()

  const label = propertyType ? (
    <span className="font-semibold text-cyan-800">{propertyTypeMap[propertyType].label}</span>
  ) : (
    "Property Type"
  )

  const renderOption = (option: PropertyTypeOption) => {
    const Icon = iconMap[option.value] || HouseIcon
    return (
      <Label
        key={option.value}
        className="has-data-[state=checked]:bg-amber-50 has-data-[state=checked]:text-amber-900 ring ring-border has-data-[state=checked]:ring-amber-600 flex flex-col items-center justify-center group gap-3 size-28 border rounded-md p-2 cursor-pointer hover:bg-gray-50 "
      >
        <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
        <Icon />
        <div>{option.label}</div>
      </Label>
    )
  }

  return (
    <Popover>
      <div className="relative">
        {propertyType && (
          <Button
            variant="ghost"
            size={"sm"}
            onClick={setFilters.bind(null, {
              "property-type": undefined,
            })}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-2 text-cyan-800"
          >
            <XIcon size={16} strokeWidth={3} />
          </Button>
        )}
        <PopoverTrigger asChild>
          <Button
            className="h-12 flex items-center justify-start gap-2 w-40 text-left"
            variant={"outline"}
          >
            <span>{label}</span>
            {!propertyType ? (
              <span className="ml-2">
                <ChevronDownIcon size={16} />
              </span>
            ) : (
              <span className="w-6"></span>
            )}
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-fit">
        <RadioGroup
          className="grid grid-cols-4 gap-4 mb-4"
          onValueChange={(value) => {
            setFilters({ "property-type": value })
          }}
          value={propertyType}
        >
          {propertyTypeOptions.map(renderOption)}
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
