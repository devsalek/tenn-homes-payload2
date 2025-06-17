"use client"
import { useSearchResults } from "@/app/(frontend)/(search)/search-results-provider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { PopoverClose } from "@radix-ui/react-popover"
import { ChevronDownIcon, XIcon } from "lucide-react"

const bedsOptions = [
  {
    value: 1,
    label: "1+",
  },
  {
    value: 2,
    label: "2+",
  },
  {
    value: 3,
    label: "3+",
  },
  {
    value: 4,
    label: "4+",
  },
  {
    value: 5,
    label: "5+",
  },
]

const bathsOptions = [
  {
    value: 1,
    label: "1+",
  },
  {
    value: 2,
    label: "2+",
  },
  {
    value: 3,
    label: "3+",
  },
  {
    value: 4,
    label: "4+",
  },
]

export function FilterBedsBaths() {
  const {
    searchResults,
    setFilters,
    filters: { beds, baths },
  } = useSearchResults()

  const label =
    beds || baths ? (
      <span className="font-semibold text-cyan-800">
        {beds}+ bd / {baths}+ ba
      </span>
    ) : (
      "Beds/Baths"
    )

  return (
    <Popover>
      <div className="relative">
        {beds + baths > 0 && (
          <Button
            variant="ghost"
            size={"sm"}
            onClick={setFilters.bind(null, { "min-beds": undefined, "min-baths": undefined })}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-2 text-cyan-800"
          >
            <XIcon size={16} strokeWidth={3} />
          </Button>
        )}
        <PopoverTrigger asChild>
          <Button className="h-12 flex items-center gap-2" variant={"outline"}>
            <span>{label}</span>
            {beds + baths === 0 ? (
              <span className="ml-2">
                <ChevronDownIcon size={16} />
              </span>
            ) : (
              <span className="w-6"></span>
            )}
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-fit grid gap-4">
        <div className="grid gap-2">
          <div>
            <h3 className="font-semibold">Beds</h3>
            <RadioGroup
              className="flex items-center gap-2"
              onValueChange={(value) => {
                setFilters({ "min-beds": value, "min-baths": baths })
              }}
              value={String(beds)}
            >
              {bedsOptions.map((option) => (
                <Label
                  htmlFor={option.label}
                  key={`beds:${option.value}`}
                  className="has-data-[state=checked]:bg-amber-50 has-data-[state=checked]:text-amber-900 ring has-data-[state=checked]:ring-2 ring-border has-data-[state=checked]:ring-amber-600 flex items-center gap-1 border rounded-md px-6 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  <RadioGroupItem
                    value={String(option.value)}
                    id={option.label}
                    className="sr-only"
                  />
                  <div>{option.label}</div>
                </Label>
              ))}
            </RadioGroup>
          </div>
          <div>
            <h3 className="font-semibold">Baths</h3>
            <RadioGroup
              className="flex items-center gap-2"
              onValueChange={(value) => {
                setFilters({ "min-beds": beds, "min-baths": value })
              }}
              value={String(baths)}
            >
              {bathsOptions.map((option) => (
                <Label
                  htmlFor={`baths-${option.label}`}
                  key={`baths:${option.value}`}
                  className="has-data-[state=checked]:bg-amber-50 has-data-[state=checked]:text-amber-900 ring  has-data-[state=checked]:ring-2 ring-border has-data-[state=checked]:ring-amber-600 flex items-center gap-1 border rounded-md px-6 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  <RadioGroupItem
                    value={String(option.value)}
                    id={`baths-${option.label}`}
                    className="sr-only"
                  />
                  <div>{option.label}</div>
                </Label>
              ))}
            </RadioGroup>
          </div>
        </div>
        <PopoverClose asChild>
          <Button type="button" size="lg" className="w-full">
            See {searchResults.totalDocs} homes
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  )
}
