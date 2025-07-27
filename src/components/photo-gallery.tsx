"use client"

import { Camera } from "lucide-react"

interface Image {
  id: string
  name: string
  url: string
  createdAt: Date
  updatedAt: Date
}

interface PhotoGalleryProps {
  images: Image[]
}

export function PhotoGallery({ images }: PhotoGalleryProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.length > 0 ? (
        images.map((image) => (
          <div
            key={image.id}
            className="group relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
          >
            <img
              src={image.url}
              alt={image.name}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-sm font-medium">{image.name}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        // Show placeholder when no images
        Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="group relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Camera className="mx-auto h-8 w-8 text-primary mb-2" />
                <p className="text-gray-600 text-sm">Carol</p>
                <p className="text-gray-500 text-xs">Foto {index + 1}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
} 