'use client'

import { Media } from '@/payload-types'
import { TrashIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
export const PhotoEditorClient = ({ photos }: { photos: Media[] }) => {
  const [orderedPhotos, setOrderedPhotos] = useState(
    photos.filter((m) => typeof m.url === 'string'),
  )
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
      const newPhotos = [...orderedPhotos]
      const [draggedPhoto] = newPhotos.splice(draggedIndex, 1)
      newPhotos.splice(dragOverIndex, 0, draggedPhoto)
      setOrderedPhotos(newPhotos)
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

  return (
    <div className="flex flex-wrap gap-3">
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
          <button className="absolute size-8 -top-2 -right-2 bg-white flex items-center justify-center rounded-full border">
            <XIcon size={12} />
          </button>
        </div>
      ))}
    </div>
  )
}
