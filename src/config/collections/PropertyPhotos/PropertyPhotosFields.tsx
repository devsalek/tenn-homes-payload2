'use client'

export const PropertyPhotosField: React.FC = () => {
  return (
    <div className="field-type relationship">
      <label className="field-label">Photos</label>
      <div className="property-photos-manager">
        <div className="mb-4 text-sm text-gray-600">
          Drag photos to reorder. The first photo will be the featured image.
        </div>

        <div className="mt-4">
          <a href="/admin/collections/property-photos/create" className="btn btn--style-secondary">
            Add More Photos
          </a>
        </div>
      </div>
    </div>
  )
}
