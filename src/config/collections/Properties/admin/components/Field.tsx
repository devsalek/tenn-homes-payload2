import React from 'react'
import { useField } from '@payloadcms/ui'
import { PhotoEditorClient } from './PhotoEditorClient'
import { Media } from '@/payload-types'

interface PhotosFieldProps {
  path: string
}

export const PhotosField: React.FC<PhotosFieldProps> = (props) => {
  const { value, setValue, showError, errorMessage } = useField<number[] | Media[]>({
    path: props.path,
  })

  // Extract photos from the value
  const photos = Array.isArray(value)
    ? (value.filter((item) => typeof item === 'object' && item !== null) as Media[])
    : []

  return (
    <div>
      {/* Show any form errors */}
      {showError && <div className="text-red-500 text-sm mt-1">{errorMessage}</div>}

      {/* The reordering UI */}
      <PhotoEditorClient photos={photos} value={value} path={props.path} onChange={setValue} />
    </div>
  )
}
