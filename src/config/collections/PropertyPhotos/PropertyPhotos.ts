import { CollectionConfig } from 'payload'

export const PropertyPhotos: CollectionConfig = {
  slug: 'property-photos',
  upload: true,
  fields: [
    {
      name: 'property',
      type: 'relationship',
      relationTo: 'properties',
      required: true,
      index: true,
    },
    {
      name: 'altText',
      type: 'text',
      label: 'Alt Text',
      required: true,
      admin: {
        description: 'Describe the image for accessibility and SEO',
      },
    },
    {
      name: 'areaType',
      type: 'select',
      required: true,
      options: [
        { label: 'Interior', value: 'interior' },
        { label: 'Exterior', value: 'exterior' },
        { label: 'Views', value: 'views' },
      ],
    },
    {
      name: 'interiorArea',
      type: 'select',
      admin: {
        condition: (data) => data.areaType === 'interior',
      },
      options: [
        { label: 'Living Room', value: 'living_room' },
        { label: 'Kitchen', value: 'kitchen' },
        { label: 'Master Bedroom', value: 'master_bedroom' },
        { label: 'Bathroom', value: 'bathroom' },
        { label: 'Dining Room', value: 'dining_room' },
        { label: 'Family Room', value: 'family_room' },
        { label: 'Den', value: 'den' },
        { label: 'Office', value: 'office' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'exteriorArea',
      type: 'select',
      admin: {
        condition: (data) => data.areaType === 'exterior',
      },
      options: [
        { label: 'Front Yard', value: 'front_yard' },
        { label: 'Backyard', value: 'backyard' },
        { label: 'Driveway', value: 'driveway' },
        { label: 'Pool', value: 'pool' },
        { label: 'Other', value: 'other' },
        // ... more exterior options
      ],
    },

    {
      name: 'viewType',
      type: 'select',
      admin: {
        condition: (data) => data.areaType === 'views',
      },
      options: [
        // From Property
        { label: 'Front View (from property)', value: 'front_view' },
        { label: 'Back View (from property)', value: 'back_view' },
        { label: 'Side View (from property)', value: 'side_view' },
        { label: 'Balcony View', value: 'balcony_view' },
        { label: 'Window View', value: 'window_view' },
        { label: 'Rooftop View', value: 'rooftop_view' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      index: true,
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: true,
      label: 'Published',
    },
    {
      name: 'caption',
      type: 'textarea',
      label: 'Caption',
    },
  ],
}
