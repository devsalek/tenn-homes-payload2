'use client'

import { Media } from '@/payload-types'
import { useProperty } from './context'

export const PropertyGallery = () => {
  const property = useProperty()

  const images = property?.photos as Media[]

  // Feature image is the first one
  const featureImage = images[0]
  // Grid images are all remaining images (index 1 and beyond)
  const gridImages = images.slice(1)
  return (
    <div className="relative">
      {/* Main gallery with CSS Grid that changes based on screen size */}
      <div className="grid grid-cols-12 grid-rows-1 gap-1  max-h-[520px] 2xl:max-h-[680px]">
        {/* Feature image - always visible */}
        {featureImage?.url && (
          <img
            src={featureImage.url}
            alt={featureImage.alt}
            className="w-full col-span-12 h-full tablet:col-span-8 desktop:col-span-6 object-cover cursor-pointer"
          />
        )}

        {/* Secondary images - visible based on screen size */}
        <div className="hidden h-full grid-cols-1 tablet:grid tablet:grid-cols-1 desktop:grid-cols-2 large:grid-cols-3 tablet:grid-rows-2 tablet:col-span-4 desktop:col-span-6 gap-1">
          {gridImages.map((image, index) => {
            // Determine visibility based on screen size and image position
            let visibilityClass = ''

            if (index < 2) {
              // First two images visible on tablet and up
              visibilityClass = ''
            } else if (index < 4) {
              // Next two images visible on desktop and up
              visibilityClass = 'hidden desktop:block'
            } else {
              // Last two images visible only on large screens
              visibilityClass = 'hidden large:block'
            }

            if (!image.url) return null

            return (
              <img
                key={image.id}
                src={image.url}
                alt={image.alt}
                className={`w-full h-full object-cover cursor-pointer photo-${image.id} ${visibilityClass}`}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
