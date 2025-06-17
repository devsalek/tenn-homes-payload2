"use client"
import { useSearchResults } from "@/app/(frontend)/(search)/search-results-provider"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

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
    setFilters,
    filters: { beds, baths },
  } = useSearchResults()

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold">Beds</h3>
          {!!beds && (
            <button
              className="text-cyan-700 underline p-0 text-sm font-semibold"
              type="button"
              onClick={() => setFilters({ "min-beds": undefined })}
            >
              Clear
            </button>
          )}
        </div>
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
              <RadioGroupItem value={String(option.value)} id={option.label} className="sr-only" />
              <div>{option.label}</div>
            </Label>
          ))}
        </RadioGroup>
      </div>
      <div className="grid gap-2">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold">Baths</h3>
          {!!baths && (
            <button
              className="text-cyan-700 underline p-0 text-sm font-semibold"
              type="button"
              onClick={() => setFilters({ "min-baths": undefined })}
            >
              Clear
            </button>
          )}
        </div>
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
  )
}
