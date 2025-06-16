"use client"
import { useSearchResults } from "@/app/(frontend)/(search)/search-results-provider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE } from "@/constants"
import { PopoverClose } from "@radix-ui/react-popover"
import { ChevronDownIcon, XIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const priceOptions = [
  {
    value: 0,
    label: "Any",
  },
  {
    value: "100-300",
    label: "$100K - $300K",
  },
  {
    value: "300-500",
    label: "$300K - $500K",
  },
  {
    value: "500-750",
    label: "$500K - $750K",
  },
  {
    value: "750-1000",
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
  const router = useRouter()
  const {
    updateSearch,
    searchCriteria: { filters },
    searchResults,
  } = useSearchResults()
  const [minPrice, setMinPrice] = useState<number>(filters["min-price"] || DEFAULT_MIN_PRICE)
  const [maxPrice, setMaxPrice] = useState<number>(filters["max-price"] || DEFAULT_MAX_PRICE)
  const [value, setValue] = useState<string>(
    minPrice > 0 || maxPrice < DEFAULT_MAX_PRICE ? `${minPrice / 1000}-${maxPrice / 1000}` : "any",
  )

  console.log({ maxPrice, minPrice, value })

  const maxPriceLabel = maxPrice === DEFAULT_MAX_PRICE ? "Any" : `${formatLabel(maxPrice)}`
  const minPriceLabel = minPrice > 0 ? `${formatLabel(minPrice)}` : "Any"
  const label =
    minPrice > 0 || maxPrice < DEFAULT_MAX_PRICE ? (
      <span className="text-cyan-800 font-semibold">
        {minPriceLabel} - {maxPriceLabel}
      </span>
    ) : (
      "Price"
    )

  const resetFilters = () => {
    setMinPrice(DEFAULT_MIN_PRICE)
    setMaxPrice(DEFAULT_MAX_PRICE)
    setValue("any")
    router.push(
      updateSearch({
        filters: { ...filters, "min-price": undefined, "max-price": undefined },
      }),
    )
  }

  const setPriceRange = (value: string) => {
    setValue(value)
    let newMinPrice = undefined
    let newMaxPrice = undefined
    if (value === "any") {
      setMinPrice(DEFAULT_MIN_PRICE)
      setMaxPrice(DEFAULT_MAX_PRICE)
    } else {
      const [min, max] = value.split("-").map(Number)
      newMinPrice = min * 1000
      newMaxPrice = max * 1000
      setMinPrice(newMinPrice)
      setMaxPrice(newMaxPrice)
    }

    router.push(
      updateSearch({
        filters: { ...filters, "min-price": newMinPrice, "max-price": newMaxPrice },
      }),
    )
  }

  const isSet = minPrice > 0 || maxPrice < DEFAULT_MAX_PRICE

  return (
    <Popover>
      <div className="relative">
        {isSet && (
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
                  htmlFor={`baths-${option.label}`}
                  key={`baths:${option.value}`}
                  className="has-data-[state=checked]:bg-amber-50 has-data-[state=checked]:text-amber-900 ring  has-data-[state=checked]:ring-2 ring-border has-data-[state=checked]:ring-amber-600 flex items-center justify-center gap-1 border rounded-md px-6 py-3 hover:bg-gray-100 cursor-pointer focus-within:ring-2 focus-within:ring-amber-500"
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
          <Button
            type="button"
            className="w-full"
            size={"lg"}
            onClick={() => {
              const minPriceFilter = minPrice === DEFAULT_MIN_PRICE ? undefined : minPrice
              const maxPriceFilter = maxPrice === DEFAULT_MAX_PRICE ? undefined : maxPrice

              const url = updateSearch({
                filters: { ...filters, "min-price": minPriceFilter, "max-price": maxPriceFilter },
              })
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
