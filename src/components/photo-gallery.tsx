"use client"

import { Camera } from "lucide-react"
import { useState } from "react"
import { ImageLightbox } from "./image-lightbox"

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
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
    setLightboxOpen(true)
  }

  const imageUrls = images.map(img => img.url)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-square overflow-hidden rounded-lg winter-card border-white/20 shadow-sm cursor-pointer"
              onClick={() => handleImageClick(index)}
            >
              <img
                src={image.url}
                alt={image.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
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
              className="group relative aspect-square overflow-hidden rounded-lg winter-card border-white/20 shadow-sm"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Camera className="mx-auto h-8 w-8 text-primary mb-2" />
                  <p className="text-white text-sm">Carol</p>
                  <p className="text-white/60 text-xs">Foto {index + 1}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Lightbox */}
      <ImageLightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={imageUrls}
        initialIndex={selectedImageIndex}
      />
    </>
  )
} 