import { OptionObject } from 'payload'

export const listingStatusMap = {
  forsale: { label: 'For Sale', color: 'bg-status-forsale' },
  pending: { label: 'Offer Pending', color: 'bg-status-pending' },
  contract: { label: 'Under Contract', color: 'bg-status-contract' },
  sold: { label: 'Sold', color: 'bg-status-sold' },
  notforsale: { label: 'Not For Sale', color: 'bg-status-notforsale' },
} as const

export const listingStatusOptions: OptionObject[] = Object.entries(listingStatusMap).map(
  ([key, value]) => ({
    label: value.label,
    value: key,
  }),
)
