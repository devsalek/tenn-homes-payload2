import { PropertyPhoto } from '@/payload-types'
import { Card } from '@payloadcms/ui'
import React from 'react'
import './list-styles.css'
export const PropertyPhotosGridView: React.FC<{ data: { docs: PropertyPhoto[] } }> = ({ data }) => {
  console.log(data)
  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '20px',
        }}
      >
        {data?.docs?.map((doc) => (
          <div key={doc.id} className="bg-white border border-gray-200 rounded-md p-4">
            <img src={doc.sizes?.thumbnail?.url!} alt={doc.altText} />
          </div>
        ))}
      </div>
    </div>
  )
}
