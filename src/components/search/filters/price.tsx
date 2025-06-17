"use client"
import { useSearchResults } from "@/app/(frontend)/(search)/search-results-provider"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE } from "@/constants"

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

export function FilterPrice() {
  const {
    setFilters,
    filters: { minPrice, maxPrice },
  } = useSearchResults()

  const value =
    minPrice > DEFAULT_MIN_PRICE || maxPrice < DEFAULT_MAX_PRICE
      ? `${minPrice / 1000}|${maxPrice / 1000}`
      : null

  const setPriceRange = (value: string) => {
    let newMinPrice = undefined
    let newMaxPrice = undefined
    if (value !== null) {
      const [min, max] = value.split("|").map(Number)
      newMinPrice = min * 1000
      newMaxPrice = max * 1000
    }

    setFilters({ "min-price": newMinPrice, "max-price": newMaxPrice })
  }

  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-3">
        <h3 className="font-semibold">Price</h3>
        {value && (
          <button
            className="text-cyan-700 underline p-0 text-sm font-semibold"
            type="button"
            onClick={() => setFilters({ "min-price": undefined, "max-price": undefined })}
          >
            Clear
          </button>
        )}
      </div>
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
  )
}
