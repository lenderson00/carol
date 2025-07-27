"use client"

import { Camera } from "lucide-react"

// You can replace these placeholder images with actual photos of Carol
const carolPhotos = [
  {
    id: 1,
    src: "/api/placeholder/400/400", // Replace with actual photo URLs
    alt: "Carol - Foto 1",
    title: "Carol"
  },
  {
    id: 2,
    src: "/api/placeholder/400/400",
    alt: "Carol - Foto 2", 
    title: "Carol"
  },
  {
    id: 3,
    src: "/api/placeholder/400/400",
    alt: "Carol - Foto 3",
    title: "Carol"
  },
  {
    id: 4,
    src: "/api/placeholder/400/400",
    alt: "Carol - Foto 4",
    title: "Carol"
  },
  {
    id: 5,
    src: "/api/placeholder/400/400",
    alt: "Carol - Foto 5",
    title: "Carol"
  },
  {
    id: 6,
    src: "/api/placeholder/400/400",
    alt: "Carol - Foto 6",
    title: "Carol"
  },
  {
    id: 7,
    src: "/api/placeholder/400/400",
    alt: "Carol - Foto 7",
    title: "Carol"
  },
  {
    id: 8,
    src: "/api/placeholder/400/400",
    alt: "Carol - Foto 8",
    title: "Carol"
  }
]

export function PhotoGallery() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {carolPhotos.map((photo) => (
        <div
          key={photo.id}
          className="group relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
        >
          {/* Placeholder for actual photos */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Camera className="mx-auto h-8 w-8 text-primary mb-2" />
              <p className="text-gray-600 text-sm">{photo.title}</p>
              <p className="text-gray-500 text-xs">Foto {photo.id}</p>
            </div>
          </div>
          
          {/* Uncomment and replace with actual photos */}
          {/* 
          <img
            src={photo.src}
            alt={photo.alt}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          */}
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-sm font-medium">{photo.title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 