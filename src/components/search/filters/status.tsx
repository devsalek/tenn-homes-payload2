import { useSearchResults } from "@/app/(frontend)/(search)/search-results-provider"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { listingStatusOptions } from "@/config/collections/Properties/listing-status-map"

export function FilterStatus() {
  const {
    setFilters,
    filters: { propertyStatus },
  } = useSearchResults()
  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-3">
        <h3 className="font-semibold">Status</h3>
        {propertyStatus && (
          <button
            className="text-cyan-700 underline p-0 text-sm font-semibold"
            type="button"
            onClick={() => setFilters({ "property-status": undefined })}
          >
            Clear
          </button>
        )}
      </div>
      <RadioGroup
        className="grid grid-cols-2 gap-2"
        value={propertyStatus}
        onValueChange={(value) => {
          setFilters({
            "property-status": value,
          })
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
    </div>
  )
}
