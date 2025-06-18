import { Label } from "@/components/ui/label"
import { RadioGroupItem } from "@/components/ui/radio-group"

export const FilterGroupItem = ({
  id,
  value,
  children,
}: {
  id: string
  value: string
  children: React.ReactNode
}) => {
  return (
    <Label
      htmlFor={id}
      className="has-data-[state=checked]:bg-primary/10 has-data-[state=checked]:text-primary ring ring-input has-data-[state=checked]:ring-primary flex items-center justify-center gap-1 border rounded-md p-4 w-full hover:bg-gray-100 cursor-pointer"
    >
      <RadioGroupItem value={value} id={id} className="sr-only hidden" />
      <div>{children}</div>
    </Label>
  )
}
