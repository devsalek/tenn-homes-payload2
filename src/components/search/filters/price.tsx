"use client"
import { useSearchResults } from "@/app/(frontend)/(search)/search-results-provider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE } from "@/constants"
import { PopoverClose } from "@radix-ui/react-popover"
import { ChevronDownIcon, XIcon } from "lucide-react"

const priceOptions = [
  {
    value: "100|300",
    label: "$100K - $300K",
  },
  {
    value: "300|500",
    label: "$300K - $500K",
  },
  {
    value: "500|750",
    label: "$500K - $750K",
  },
  {
    value: "750|1000",
    label: "$750K - $1M",
  },
]

const formatLabel = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    unitDisplay: "short",
    compactDisplay: "short",
    notation: "compact",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function FilterPrice() {
  const {
    searchCriteria: { filters },
    searchResults,
    setFilters,
  } = useSearchResults()

  const minPrice =
    filters["min-price"] && Number(filters["min-price"]) > DEFAULT_MIN_PRICE
      ? Number(filters["min-price"])
      : DEFAULT_MIN_PRICE
  const maxPrice =
    filters["max-price"] && Number(filters["max-price"]) < DEFAULT_MAX_PRICE
      ? Number(filters["max-price"])
      : DEFAULT_MAX_PRICE

  const maxPriceLabel = maxPrice === DEFAULT_MAX_PRICE ? "Any" : `${formatLabel(maxPrice)}`
  const minPriceLabel = minPrice > 0 ? `${formatLabel(minPrice)}` : "Any"

  const value =
    minPrice > DEFAULT_MIN_PRICE || maxPrice < DEFAULT_MAX_PRICE
      ? `${minPrice / 1000}|${maxPrice / 1000}`
      : "any"

  const label =
    minPrice > DEFAULT_MIN_PRICE || maxPrice < DEFAULT_MAX_PRICE ? (
      <span className="text-cyan-800 font-semibold">
        {minPriceLabel} - {maxPriceLabel}
      </span>
    ) : (
      "Price"
    )

  const setPriceRange = (value: string) => {
    let newMinPrice = undefined
    let newMaxPrice = undefined
    if (value !== "any") {
      const [min, max] = value.split("|").map(Number)
      newMinPrice = min * 1000
      newMaxPrice = max * 1000
    }

    setFilters({ "min-price": newMinPrice, "max-price": newMaxPrice })
  }

  const isSet = minPrice > 0 || maxPrice < DEFAULT_MAX_PRICE

  return (
    <Popover>
      <div className="relative">
        {isSet && (
          <Button
            variant="ghost"
            size={"sm"}
            onClick={setFilters.bind(null, { "min-price": undefined, "max-price": undefined })}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-2 text-cyan-800"
          >
            <XIcon size={16} strokeWidth={3} />
          </Button>
        )}
        <PopoverTrigger asChild>
          <Button className="h-12 flex items-center justify-between gap-2 w-42" variant={"outline"}>
            <span>{label}</span>
            {!isSet ? (
              <span className="ml-2">
                <ChevronDownIcon size={16} />
              </span>
            ) : (
              <span className="w-6"></span>
            )}
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-56 grid gap-4">
        <div className="grid gap-2">
          <div>
            <h3 className="font-semibold mb-2">Price Range</h3>
            <RadioGroup className="flex flex-col gap-2" onValueChange={setPriceRange} value={value}>
              {priceOptions.map((option) => (
                <Label
                  htmlFor={`price-${option.label}`}
                  key={`price:${option.value}`}
                  className="has-data-[state=checked]:bg-amber-50 has-data-[state=checked]:text-amber-900 ring  has-data-[state=checked]:ring-2 ring-border has-data-[state=checked]:ring-amber-600 flex items-center justify-center gap-1 border rounded-md px-6 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  <RadioGroupItem
                    value={String(option.value)}
                    id={`price-${option.label}`}
                    className="sr-only"
                  />
                  <div>{option.label}</div>
                </Label>
              ))}
            </RadioGroup>
          </div>
        </div>
        <PopoverClose asChild>
          <Button type="button" className="w-full" size={"lg"}>
            See {searchResults.totalDocs} homes
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  )
}
