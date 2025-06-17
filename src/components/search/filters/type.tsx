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
import { FilterGroupItem } from "./filter-group-item"

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
      <FilterGroupItem
        id={`type:${option.value}`}
        key={`type:${option.value}`}
        value={String(option.value)}
      >
        <div className="flex flex-col items-center">
          <div className="w-12">
            <Icon />
          </div>
          <div>{option.label}</div>
        </div>
      </FilterGroupItem>
    )
  }

  return (
    <div className="grid gap-2 p-4">
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
