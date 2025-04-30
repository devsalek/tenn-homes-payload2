import type { CollectionConfig } from 'payload'

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
}
