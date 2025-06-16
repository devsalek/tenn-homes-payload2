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
import { useRouter } from "next/navigation"
import { useState } from "react"

export function FilterTypePopover() {
  const router = useRouter()
  const {
    updateSearch,
    searchCriteria: { filters },
    searchResults,
  } = useSearchResults()
  const [value, setValue] = useState<PropertyType | undefined>(filters["property-type"])

  const resetFilters = () => {
    setValue(undefined)
    router.push(
      updateSearch({
        filters: { ...filters, "property-type": undefined },
      }),
    )
  }
  const label = value ? (
    <span className="font-semibold text-cyan-800">{propertyTypeMap[value].label}</span>
  ) : (
    "Property Type"
  )

  const renderOption = (option: PropertyTypeOption) => {
    const Icon = option.icon
    return (
      <Label
        key={option.value}
        className="has-data-[state=checked]:bg-amber-50 has-data-[state=checked]:text-amber-900 ring ring-border has-data-[state=checked]:ring-amber-600 flex flex-col items-center justify-center group gap-3 size-28 border rounded-md p-2 cursor-pointer hover:bg-gray-50 focus-within:ring-2 focus-within:ring-amber-500 "
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
        {value && (
          <Button
            variant="ghost"
            size={"sm"}
            onClick={resetFilters}
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
            {!value ? (
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
            setValue(value as PropertyType)
            router.push(
              updateSearch({
                filters: { ...filters, "property-type": value },
              }),
            )
          }}
          value={value}
        >
          {propertyTypeOptions.map(renderOption)}
        </RadioGroup>
        <PopoverClose asChild>
          <Button
            type="button"
            size={"lg"}
            className="w-full"
            onClick={() => {
              const url = updateSearch({ filters: { ...filters, "property-type": value } })
              router.push(url)
            }}
          >
            See {searchResults.totalDocs} homes
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  )
}
