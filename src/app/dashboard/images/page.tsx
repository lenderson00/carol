"use client"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import { toast } from "sonner"
import { Image as ImageIcon, Trash2, Download } from "lucide-react"
import ImageUpload from "@/components/image-upload"

interface Image {
  id: string
  name: string
  url: string
  createdAt: string
}

export default function ImagesPage() {
  const [images, setImages] = useState<Image[]>([])

  const fetchImages = useCallback(async () => {
    try {
      const response = await fetch("/api/images")
      if (response.ok) {
        const data = await response.json()
        setImages(data)
      }
    } catch (error) {
      console.error("Erro ao buscar imagens:", error)
    }
  }, [])

  useEffect(() => {
    fetchImages()
  }, [fetchImages])

  const handleImageUpload = async (imageUrl: string) => {
    if (!imageUrl) return

    // If it's a Bunny CDN URL, refresh the images list
    if (imageUrl.includes('cdn.curyrio.com.br')) {
      fetchImages() // Refresh the list
    }
  }

  const handleDeleteImage = async (imageId: string) => {
    try {
      const response = await fetch(`/api/images/${imageId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Imagem deletada com sucesso!")
        fetchImages()
      } else {
        toast.error("Erro ao deletar imagem")
      }
    } catch (error) {
      console.error("Erro ao deletar imagem:", error)
      toast.error("Erro ao deletar imagem")
    }
  }

  return (
    <>
      <PageHeader
        title="Galeria de Fotos"
        subtitle="Gerencie as fotos da festa de 15 anos da Carol."
      />

      <main className="flex flex-1 flex-col gap-6 p-4 lg:gap-8 lg:p-6">
        {/* Upload Area */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Upload de Fotos
            </CardTitle>
            <CardDescription>
              Arraste e solte as fotos aqui, clique para selecionar ou use Ctrl+V para colar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUpload
              onImageChange={handleImageUpload}
              currentImage={""} // No longer needed as ImageUpload handles its own state
              className="w-full"
              saveToGallery={true}
            />
          </CardContent>
        </Card>

        {/* Images Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Fotos da Festa</CardTitle>
            <CardDescription>
              {images.length} foto(s) na galeria
            </CardDescription>
          </CardHeader>
          <CardContent>
            {images.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <ImageIcon className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>Nenhuma foto enviada ainda.</p>
                <p className="text-sm">Comece fazendo upload das primeiras fotos!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="group relative aspect-square overflow-hidden rounded-lg border bg-gray-100"
                  >
                    <img
                      src={image.url}
                      alt={image.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    
                    {/* Overlay with actions */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => window.open(image.url, '_blank')}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteImage(image.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Image info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <p className="text-white text-sm font-medium truncate">
                        {image.name}
                      </p>
                      <p className="text-white/70 text-xs">
                        {new Date(image.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </>
  )
}