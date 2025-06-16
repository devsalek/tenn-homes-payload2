import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  PropertyType,
  propertyTypeOptions,
} from "@/config/collections/Properties/property-type-options"
import { SearchFilterKeys } from "@/lib/search-utils"

export function FilterType({
  value,
  onChange,
}: {
  value: PropertyType | undefined
  onChange: (filter: SearchFilterKeys) => (value: string) => void
}) {
  return (
    <RadioGroup
      className="grid grid-cols-2 gap-4 mb-4"
      onValueChange={(value) => {
        onChange("property-type")(value as PropertyType)
      }}
      value={value}
    >
      {propertyTypeOptions.map((option) => (
        <div key={option.value} className="flex items-center gap-3">
          <RadioGroupItem value={option.value} id={option.value} />
          <Label htmlFor={option.value}>{option.label}</Label>
        </div>
      ))}
    </RadioGroup>
  )
}
