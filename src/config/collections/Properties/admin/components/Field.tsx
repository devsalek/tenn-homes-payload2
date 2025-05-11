import type { RelationshipFieldServerComponent } from 'payload'
import type React from 'react'
import { PhotoEditorClient } from './PhotoEditorClient'

export const PhotosField: RelationshipFieldServerComponent = async ({ payload, data, path }) => {
  const photoIds = data[path]
  const photos = await payload.find({
    collection: 'media',
    where: {
      id: { in: photoIds },
    },
  })
  return (
    <div>
      <h1>Photo Editor</h1>
      <div>
        <PhotoEditorClient photos={photos.docs} />
      </div>
    </div>
  )
}
