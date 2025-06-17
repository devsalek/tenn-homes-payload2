"use client"
import { useSearchResults } from "@/app/(frontend)/(search)/search-results-provider"
import { Button } from "@/components/ui/button"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PopoverClose } from "@radix-ui/react-popover"
import { ChevronDownIcon, XIcon } from "lucide-react"

export function FilterPopover({
  children,
  isSet,
  label,
  placeholder,
  onClear,
}: {
  children?: React.ReactNode
  isSet: boolean
  label?: string
  placeholder?: string
  onClear: () => void
}) {
  const { searchResults } = useSearchResults()

  const renderLabel = isSet ? (
    <span className="font-semibold text-cyan-800">{label}</span>
  ) : (
    placeholder
  )

  return (
    <Popover>
      <div className="relative">
        {isSet && (
          <Button
            variant="ghost"
            size={"sm"}
            onClick={onClear}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-2 text-cyan-800"
          >
            <XIcon size={16} strokeWidth={3} />
          </Button>
        )}
        <PopoverTrigger asChild>
          <Button className="h-12 flex items-center justify-between gap-2 w-42" variant={"outline"}>
            <span>{renderLabel}</span>
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
      <PopoverContent className="w-fit grid gap-4">
        {children}
        <PopoverClose asChild>
          <Button type="button" size={"lg"} className="w-full">
            See {searchResults.totalDocs} homes
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  )
}
