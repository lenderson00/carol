"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import { toast } from "sonner"
import { Upload, Image as ImageIcon, Trash2, Download } from "lucide-react"

interface Image {
  id: string
  name: string
  url: string
  createdAt: string
}

export default function ImagesPage() {
  const [images, setImages] = useState<Image[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setIsUploading(true)
    const uploadPromises = Array.from(files).map(async (file) => {
      const formData = new FormData()
      formData.append("file", file)

      try {
        const response = await fetch("/api/bunny", {
          method: "POST",
          body: formData,
        })

        if (response.ok) {
          const result = await response.json()
          
          // Save to database
          const dbResponse = await fetch("/api/images", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: file.name,
              url: result.url,
            }),
          })

          if (dbResponse.ok) {
            return { success: true, data: await dbResponse.json() }
          } else {
            return { success: false, error: "Erro ao salvar no banco de dados" }
          }
        } else {
          return { success: false, error: "Erro no upload" }
        }
      } catch (error) {
        return { success: false, error: "Erro no upload" }
      }
    })

    const results = await Promise.all(uploadPromises)
    const successCount = results.filter(r => r.success).length
    const errorCount = results.length - successCount

    if (successCount > 0) {
      toast.success(`${successCount} imagem(ns) enviada(s) com sucesso!`)
      fetchImages()
    }
    
    if (errorCount > 0) {
      toast.error(`${errorCount} imagem(ns) falharam no upload`)
    }

    setIsUploading(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e.target.files)
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
      toast.error("Erro ao deletar imagem")
    }
  }

  return (
    <>
      <PageHeader
        title="Galeria de Fotos"
        subtitle="Gerencie as fotos da festa de 15 anos da Carol."
      >
        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
        >
          <Upload className="mr-2 h-4 w-4" />
          {isUploading ? "Enviando..." : "Enviar Fotos"}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </PageHeader>

      <main className="flex flex-1 flex-col gap-6 p-4 lg:gap-8 lg:p-6">
        {/* Upload Area */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Upload de Fotos
            </CardTitle>
            <CardDescription>
              Arraste e solte as fotos aqui ou clique para selecionar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                border-2 border-dashed rounded-lg p-8 text-center transition-colors
                ${isDragging 
                  ? "border-pink-500 bg-pink-50" 
                  : "border-gray-300 hover:border-pink-400 hover:bg-gray-50"
                }
                ${isUploading ? "opacity-50 pointer-events-none" : ""}
              `}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                {isDragging ? "Solte as fotos aqui" : "Arraste e solte as fotos aqui"}
              </p>
              <p className="text-sm text-gray-500">
                ou clique para selecionar arquivos
              </p>
              {isUploading && (
                <div className="mt-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-2">Enviando fotos...</p>
                </div>
              )}
            </div>
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