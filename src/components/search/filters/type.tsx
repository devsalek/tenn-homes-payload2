"use client"
import { useSearchResults } from "@/app/(frontend)/(search)/search-results-provider"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  PropertyType,
  PropertyTypeOption,
  propertyTypeOptions,
} from "@/config/collections/Properties/property-type-options"

import { ApartmentIcon } from "@/components/icons/apartment"
import { CastleIcon } from "@/components/icons/castle"
import { CondoIcon } from "@/components/icons/condo"
import { HouseIcon } from "@/components/icons/house"
import { LandIcon } from "@/components/icons/land"
import { MobileHomeIcon } from "@/components/icons/mobile-home"
import { TownhouseIcon } from "@/components/icons/townhouse"
import { Button } from "@/components/ui/button"

const iconMap: Record<PropertyType, React.ComponentType> = {
  "single-family": HouseIcon,
  "multi-family": ApartmentIcon,
  condo: CondoIcon,
  townhouse: TownhouseIcon,
  land: LandIcon,
  "mobile-home": MobileHomeIcon,
  other: CastleIcon,
}

export function FilterType() {
  const {
    setFilters,
    filters: { propertyType },
  } = useSearchResults()

  const renderOption = (option: PropertyTypeOption) => {
    const Icon = iconMap[option.value] || HouseIcon
    return (
      <Label
        key={option.value}
        className="has-data-[state=checked]:bg-amber-50 w-full h-28 has-data-[state=checked]:text-amber-900 ring has-data-[state=checked]:ring-2 ring-border has-data-[state=checked]:ring-amber-600 flex flex-col items-center justify-center group gap-3 border rounded-md p-2 cursor-pointer hover:bg-gray-50 "
      >
        <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
        <Icon />
        <div>{option.label}</div>
      </Label>
    )
  }

  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-3">
        <h3 className="font-semibold">Property Type</h3>
        {propertyType && (
          <button
            className="text-cyan-700 underline p-0 text-sm font-semibold"
            type="button"
            onClick={() => setFilters({ "property-type": undefined })}
          >
            Clear
          </button>
        )}
      </div>
      <RadioGroup
        className="grid grid-cols-3 lg:grid-cols-4 gap-2"
        onValueChange={(value) => {
          setFilters({ "property-type": value })
        }}
        value={propertyType}
      >
        {propertyTypeOptions.map(renderOption)}
      </RadioGroup>
    </div>
  )
}
