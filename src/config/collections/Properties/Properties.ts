import type { JSONSchema4 } from 'json-schema'

import { AfterReadHook } from 'node_modules/payload/dist/collections/config/types'
import type { CollectionConfig } from 'payload'

const formatAddress: AfterReadHook = async ({ doc }) => {
  console.log({ location: doc.location })

  return {
    ...doc,
    address: {
      street: doc.street,
      city: doc.location.city,
      state: doc.location.state_name,
      state_abbr: doc.location.state_abbr,
      zip: doc.location.zip,
      full_address: `${doc.street}, ${doc.location.city}, ${doc.location.state_abbr} ${doc.location.zip}`,
    },
  }
}
export const Properties: CollectionConfig = {
  slug: 'properties',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'price', 'listingStatus'],
    preview: ({ id }) => `http://localhost:3000/properties/${id}`,
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
      name: 'address',
      type: 'text',
      admin: {
        hidden: true,
      },
      typescriptSchema: [
        () => {
          const address: JSONSchema4 = {
            type: 'object',
            properties: {
              street: { type: 'string' },
              city: { type: 'string' },
              state: { type: 'string' },
              state_abbr: { type: 'string' },
              zip: { type: 'string' },
              full_address: {
                type: 'string',
              },
            },
            required: ['street', 'city', 'state', 'state_abbr', 'zip', 'full_address'],
          }

          return address
        },
      ],
    },
    {
      name: 'location',
      type: 'relationship',
      relationTo: 'locations',
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
    {
      name: 'features',
      type: 'relationship',
      relationTo: 'features',
      hasMany: true,
      admin: {
        description: 'Select the features for this property.',
      },
    },
  ],
  hooks: {
    afterRead: [formatAddress],
  },
}
