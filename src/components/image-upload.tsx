"use client"

import React, { useState } from "react"
import { AlertCircleIcon, ImageUpIcon, XIcon, Loader2 } from "lucide-react"
import { useFileUpload } from "@/hooks/use-file-upload"

interface ImageUploadProps {
  onImageChange: (imageUrl: string) => void
  currentImage?: string
  className?: string
}

export default function ImageUpload({ onImageChange, currentImage, className = "" }: ImageUploadProps) {
  const maxSizeMB = 5
  const maxSize = maxSizeMB * 1024 * 1024 // 5MB default
  const [isUploading, setIsUploading] = useState(false)

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/*",
    maxSize,
  })

  const previewUrl = files[0]?.preview || currentImage || null

  const handleImageChange = (url: string) => {
    onImageChange(url)
  }

  // Upload file to Bunny
  const uploadToBunny = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch("/api/bunny", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Failed to upload image")
    }

    const result = await response.json()
    return result.url
  }

  // Handle paste events for Ctrl+V functionality
  const handlePaste = React.useCallback(async (event: ClipboardEvent) => {
    const items = event.clipboardData?.items
    if (!items) return

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile()
        if (file) {
          setIsUploading(true)
          try {
            const uploadedUrl = await uploadToBunny(file)
            handleImageChange(uploadedUrl)
          } catch (error) {
            console.error('Failed to upload pasted image:', error)
          } finally {
            setIsUploading(false)
          }
          break
        }
      }
    }
  }, [handleImageChange, uploadToBunny])

  // Add paste event listener when component mounts
  React.useEffect(() => {
    document.addEventListener('paste', handlePaste)
    return () => {
      document.removeEventListener('paste', handlePaste)
    }
  }, [handlePaste])

  // When a file is uploaded, upload it to Bunny
  React.useEffect(() => {
    if (files[0]?.file instanceof File) {
      const uploadFile = async () => {
        setIsUploading(true)
        try {
          const uploadedUrl = await uploadToBunny(files[0].file as File)
          handleImageChange(uploadedUrl)
          // Clear the file after successful upload
          removeFile(files[0].id)
        } catch (error) {
          console.error('Failed to upload file:', error)
        } finally {
          setIsUploading(false)
        }
      }
      uploadFile()
    }
  }, [files, handleImageChange, removeFile])

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="relative">
        {/* Drop area */}
        <div
          role="button"
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-32 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none has-[input:focus]:ring-[3px]"
        >
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload file"
          />
          {previewUrl ? (
            <div className="absolute inset-0">
              <img
                src={previewUrl}
                alt="Uploaded image"
                className="size-full object-cover"
              />
              {isUploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <div
                className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                aria-hidden="true"
              >
                {isUploading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <ImageUpIcon className="size-4 opacity-60" />
                )}
              </div>
              <p className="mb-1.5 text-sm font-medium">
                {isUploading ? "Enviando imagem..." : "Arraste uma imagem aqui ou clique para selecionar"}
              </p>
              <p className="text-muted-foreground text-xs">
                Tamanho máximo: {maxSizeMB}MB • Ctrl+V para colar
              </p>
            </div>
          )}
        </div>
        {previewUrl && !isUploading && (
          <div className="absolute top-4 right-4">
            <button
              type="button"
              className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
              onClick={() => {
                removeFile(files[0]?.id)
                handleImageChange('')
              }}
              aria-label="Remove image"
            >
              <XIcon className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-1 text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      {/* URL input for manual image URL */}
      <div className="grid gap-2">
        <label className="text-sm font-medium">Ou insira a URL da imagem:</label>
        <input
          type="url"
          placeholder="https://exemplo.com/imagem.jpg"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={currentImage || ''}
          onChange={(e) => handleImageChange(e.target.value)}
        />
      </div>
    </div>
  )
} 