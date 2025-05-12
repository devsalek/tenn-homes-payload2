'use client'

import { Media } from '@/payload-types'
import { XIcon } from 'lucide-react'
import { useState, useEffect } from 'react'

interface PhotoEditorClientProps {
  photos: Media[]
  value?: number[] | Media[]
  path: string
  onChange?: (value: number[]) => void
}

export const PhotoEditorClient = ({
  photos,
  value = [],
  path,
  onChange,
}: PhotoEditorClientProps) => {
  const [orderedPhotos, setOrderedPhotos] = useState<Media[]>([])
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  useEffect(() => {
    // Handle both ID arrays and media object arrays
    const photoIds = Array.isArray(value)
      ? value.map((item) => (typeof item === 'number' ? item : item.id))
      : []

    if (photoIds.length > 0) {
      const orderedFromValue = photoIds
        .map((id) => photos.find((p) => p.id === id))
        .filter(Boolean) as Media[]
      setOrderedPhotos(orderedFromValue)
    } else {
      setOrderedPhotos([])
    }
  }, [photos, value])

  const updateFieldValue = (updatedPhotos: Media[]) => {
    if (onChange) {
      onChange(updatedPhotos.map((photo) => photo.id))
    }
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
      const newPhotos = [...orderedPhotos]
      const [draggedPhoto] = newPhotos.splice(draggedIndex, 1)
      newPhotos.splice(dragOverIndex, 0, draggedPhoto)
      setOrderedPhotos(newPhotos)
      updateFieldValue(newPhotos)
    }
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    setDragOverIndex(index)
  }

  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

  const handleRemovePhoto = (photoId: number) => {
    const updatedPhotos = orderedPhotos.filter((photo) => photo.id !== photoId)
    setOrderedPhotos(updatedPhotos)
    updateFieldValue(updatedPhotos)
  }

  // Only show reordering UI if there are photos
  if (orderedPhotos.length === 0) {
    return null
  }

  return (
    <div className="space-y-2 mt-4">
      <label className="text-sm font-medium text-gray-700">Drag to reorder photos</label>
      <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-md">
        {orderedPhotos.map((photo, index) => (
          <div
            key={photo.id}
            className={`relative bg-white rounded-md border size-64 p-2 cursor-move transition-opacity ${
              draggedIndex === index ? 'opacity-50' : ''
            } ${dragOverIndex === index ? 'border-blue-500 border-2' : ''}`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
          >
            <img src={photo.url!} alt={photo.alt} className="w-full h-full object-cover" />
            <button
              onClick={() => handleRemovePhoto(photo.id)}
              className="absolute size-8 -top-2 -right-2 bg-white flex items-center justify-center rounded-full border hover:bg-red-50"
            >
              <XIcon size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
