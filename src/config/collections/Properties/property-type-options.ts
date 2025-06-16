import { ApartmentIcon } from "@/components/icons/apartment"
import { CastleIcon } from "@/components/icons/castle"
import { CondoIcon } from "@/components/icons/condo"
import { HouseIcon } from "@/components/icons/house"
import { LandIcon } from "@/components/icons/land"
import { MobileHomeIcon } from "@/components/icons/mobile-home"
import { TownhouseIcon } from "@/components/icons/townhouse"
import { JSX } from "react"

export const propertyTypeMap = {
  "single-family": { label: "Single Family", icon: HouseIcon },
  "multi-family": { label: "Multi-Family", icon: ApartmentIcon },
  condo: { label: "Condo", icon: CondoIcon },
  townhouse: { label: "Townhouse", icon: TownhouseIcon },
  land: { label: "Land", icon: LandIcon },
  "mobile-home": { label: "Mobile Home", icon: MobileHomeIcon },
  other: { label: "Other", icon: CastleIcon },
}
export type PropertyType = keyof typeof propertyTypeMap
export type PropertyTypeOption = {
  label: string
  value: PropertyType
  icon: () => JSX.Element
}

export const propertyTypeOptions: PropertyTypeOption[] = Object.entries(propertyTypeMap).map(
  ([value, item]) => ({
    label: item.label,
    value: value as PropertyType,
    icon: item.icon,
  }),
)
