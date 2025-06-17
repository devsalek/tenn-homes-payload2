import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  ListingStatus,
  listingStatusOptions,
} from "@/config/collections/Properties/listing-status-map"
import { SearchFilterKeys } from "@/lib/search-utils"

export function FilterStatus({
  value,
  onChange,
}: {
  value: ListingStatus | undefined
  onChange: (filter: SearchFilterKeys) => (value: string) => void
}) {
  return (
    <RadioGroup
      className="grid grid-cols-2 gap-2 mb-4"
      onValueChange={(value) => {
        onChange("property-status")(value as ListingStatus)
      }}
      value={value}
    >
      {listingStatusOptions.map((option) => (
        <Label
          htmlFor={option.value}
          key={option.value}
          className="has-data-[state=checked]:bg-amber-50 has-data-[state=checked]:text-amber-900 ring  has-data-[state=checked]:ring-2 ring-border has-data-[state=checked]:ring-amber-600 flex items-center justify-center gap-1 border rounded-md px-6 py-3 hover:bg-gray-100 cursor-pointer focus-within:ring-2 focus-within:ring-amber-500"
        >
          <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
          <div>{option.label}</div>
        </Label>
      ))}
    </RadioGroup>
  )
}
