"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"


interface ImageLightboxProps {
  open: boolean
  onClose: () => void
  images: string[]
  initialIndex: number
}

export function ImageLightbox({ open, onClose, images, initialIndex }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setCurrentIndex(initialIndex)
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }, [initialIndex, open])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return

      switch (e.key) {
        case "ArrowLeft":
          goToPrevious()
          break
        case "ArrowRight":
          goToNext()
          break
        case "Escape":
          onClose()
          break
        case "+":
        case "=":
          handleZoomIn()
          break
        case "-":
          handleZoomOut()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, currentIndex])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
    resetTransforms()
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
    resetTransforms()
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.5, 5))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev / 1.5, 0.5))
  }

  const resetTransforms = () => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  if (!images.length) return null

  const currentImage = images[currentIndex]

  return (
    <Dialog open={open} onOpenChange={onClose} >
      <DialogContent showCloseButton={false} className="min-w-[calc(100vw-5rem)] max-h-[95vh] w-full h-full focus:outline-none p-0 overflow-hidden bg-black/25 border shadow-xl backdrop-blur-xl  border-none flex items-center justify-center">
        <DialogTitle className="sr-only">
          Visualização de imagem {currentIndex + 1} de {images.length}
        </DialogTitle>
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          {/* Controles superiores */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-50 pointer-events-none">
            <div className="flex items-center space-x-2 pointer-events-auto">
              <span className="text-white text-sm bg-black/50 px-3 py-1 rounded-full">
                {currentIndex + 1} de {images.length}
              </span>
            </div>
            <div className="flex items-center space-x-2 pointer-events-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomOut}
                className="text-white hover:bg-white/20"
                disabled={zoom <= 0.5}
                title="Diminuir zoom (-)"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetTransforms}
                className="text-white hover:bg-white/20"
                title="Resetar zoom"
              >
                {Math.round(zoom * 100)}%
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomIn}
                className="text-white hover:bg-white/20"
                disabled={zoom >= 5}
                title="Aumentar zoom (+)"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <div className="w-px h-6 bg-white/30 mx-1" />
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20"
                title="Fechar (Esc)"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Imagem principal */}
          <div className="relative flex items-center justify-center w-full h-full">
            <div
              className="relative transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing"
              style={{
                transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
                transformOrigin: "center center",
              }}
              onMouseDown={(e) => {
                if (zoom <= 1) return
                const startX = e.clientX - position.x
                const startY = e.clientY - position.y

                const handleMouseMove = (e: MouseEvent) => {
                  setPosition({
                    x: e.clientX - startX,
                    y: e.clientY - startY,
                  })
                }

                const handleMouseUp = () => {
                  document.removeEventListener("mousemove", handleMouseMove)
                  document.removeEventListener("mouseup", handleMouseUp)
                }

                document.addEventListener("mousemove", handleMouseMove)
                document.addEventListener("mouseup", handleMouseUp)
              }}
            >
              <Image
                src={currentImage || "/placeholder.svg"}
                alt={`Imagem ${currentIndex + 1}`}
                width={1200}
                height={800}
                className="max-w-full max-h-[80vh] object-contain"
                priority
                draggable={false}
              />
            </div>
            {/* Navegação lateral */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={goToPrevious}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12 z-10"
                  title="Imagem anterior (←)"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={goToNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12 z-10"
                  title="Próxima imagem (→)"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>

          {/* Instruções de teclado */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/70 text-xs bg-black/30 px-3 py-1 rounded-full opacity-0 hover:opacity-100 transition-opacity">
            Use ←/→ para navegar, +/- para zoom
          </div>

          {/* Miniaturas na parte inferior */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 bg-black/50 p-2 rounded-lg max-w-[90vw] overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={image + index}
                  onClick={() => {
                    setCurrentIndex(index)
                    resetTransforms()
                  }}
                  className={`relative w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                    index === currentIndex ? "border-white" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                  title={`Ir para imagem ${index + 1}`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Miniatura ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 