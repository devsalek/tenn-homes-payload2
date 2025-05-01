import { Property, Zipcode } from '@/payload-types'
import type { CollectionConfig } from 'payload'

export interface PropertyWithAddress extends Property {
  address: {
    street: string
    city: string
    state_abbr: string
    state_name: string
    zip: string
  }
}

export const Properties: CollectionConfig = {
  slug: 'properties',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'street',
      type: 'text',
      required: true,
      label: 'Street Address',
    },
    {
      name: 'zipcode',
      type: 'relationship',
      relationTo: 'zipcodes',
      required: true,
      hasMany: false,
      admin: {
        description: 'Select a ZIP code for this property.',
      },
    },
    {
      name: 'price',
      type: 'number',
    },
    {
      name: 'listingStatus',
      type: 'select',
      required: true,
      options: [
        {
          label: 'For Sale',
          value: 'forsale',
        },
        {
          label: 'Offer Pending',
          value: 'pending',
        },
        {
          label: 'Under Contract',
          value: 'contract',
        },
        {
          label: 'Sold',
          value: 'sold',
        },
        {
          label: 'Not For Sale',
          value: 'notforsale',
        },
      ],
    },
  ],
  hooks: {
    afterRead: [
      async ({ doc }) => {
        const zipcode = doc.zipcode as Zipcode
        const address = {
          street: doc.street!,
          city: zipcode.city!,
          state_abbr: zipcode.state_abbr!,
          state_name: zipcode.state_name!,
          zip: zipcode.code!,
        }
        doc.address = address
        const docWithAddress = {
          ...doc,
          address,
          zipcode: undefined,
          street: undefined,
        } as PropertyWithAddress

        return docWithAddress
      },
    ],
  },
}
