"use client"

import { Camera } from "lucide-react"
import { BlurFade } from "@/components/magicui/blur-fade"
import { PhotoGallery } from "@/components/photo-gallery"

interface Image {
  id: string
  name: string
  url: string
  createdAt: Date
  updatedAt: Date
}

interface PhotoGallerySectionProps {
  images: Image[]
}

export function PhotoGallerySection({ images }: PhotoGallerySectionProps) {
  return (
    <section className="relative z-20 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <BlurFade delay={0.1}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
              <Camera className="h-5 w-5 text-primary" />
              <span className="text-white/90 font-medium">Galeria de Fotos</span>
            </div>
          </BlurFade>
          
          <BlurFade delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Fotos da Ana Carolina
            </h2>
          </BlurFade>
          
          <BlurFade delay={0.3}>
            <p className="text-white/80 text-xl max-w-3xl mx-auto leading-relaxed">
              Momentos especiais que fazem parte dessa história incrível da nossa debutante
            </p>
          </BlurFade>
        </div>

        <BlurFade delay={0.4}>
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <PhotoGallery images={images} />
          </div>
        </BlurFade>
      </div>
    </section>
  )
}