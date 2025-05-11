import React from 'react'
import Image from 'next/image'
import { type DefaultServerCellComponentProps } from 'payload'

export const PropertyPhotoCell = async ({ cellData, payload }: DefaultServerCellComponentProps) => {
  console.log({ cellData })
  const media = await payload.findByID({
    collection: 'property-photos',
    id: cellData,
  })
  console.log(media)

  return (
    <div
      style={{
        position: 'relative',
        width: '80px',
        height: '80px',
      }}
    >
      <Image
        src={media.sizes?.thumbnail?.url!}
        alt={media.altText}
        fill
        style={{
          objectFit: 'contain',
        }}
      />
    </div>
  )
}
