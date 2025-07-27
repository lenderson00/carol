"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"

interface Region {
  id: string
  name: string
  description?: string
  isActive: boolean
  _count?: {
    imoveis: number
  }
}

interface RegionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  region?: Region
  onSuccess: () => void
}

interface RegionFormData {
  name: string
  description: string
  isActive: boolean
}

const initialFormData: RegionFormData = {
  name: "",
  description: "",
  isActive: true,
}

export function RegionDialog({ open, onOpenChange, region, onSuccess }: RegionDialogProps) {
  const [formData, setFormData] = useState<RegionFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isEditing = !!region

  useEffect(() => {
    if (region) {
      setFormData({
        name: region.name,
        description: region.description || "",
        isActive: region.isActive,
      })
    } else {
      setFormData(initialFormData)
    }
  }, [region, open])

  const handleInputChange = (field: keyof RegionFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const url = isEditing ? `/api/regions/${region.id}` : '/api/regions'
    const method = isEditing ? 'PUT' : 'POST'

    const promise = fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then(async (response) => {
      if (response.ok) {
        onSuccess()
        onOpenChange(false)
        if (!isEditing) {
          setFormData(initialFormData)
        }
        return response.json()
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Ocorreu um erro desconhecido.')
      }
    })

    toast.promise(promise, {
      loading: isEditing ? 'Atualizando região...' : 'Criando região...',
      success: isEditing ? 'Região atualizada com sucesso!' : 'Região criada com sucesso!',
      error: (err) => `Erro: ${err.message}`,
      finally: () => setIsSubmitting(false),
    })
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onOpenChange(false)
      if (!isEditing) {
        setFormData(initialFormData)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Região' : 'Nova Região'}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Atualize as informações da região.' 
              : 'Crie uma nova região para organizar seus imóveis.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Região</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Ex: Centro, Zona Sul, Barra da Tijuca..."
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição (Opcional)</Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('description', e.target.value)}
              placeholder="Descreva as características desta região..."
              rows={3}
              disabled={isSubmitting}
              className="w-full p-3 border border-input rounded-md resize-none"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('isActive', e.target.checked)}
              disabled={isSubmitting}
            />
            <Label htmlFor="isActive">Região ativa</Label>
          </div>

          {isEditing && region?._count && (
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Esta região possui <strong>{region._count.imoveis}</strong> imóvel(is) associado(s).
              </p>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? 'Salvando...' : 'Criando...'}
                </>
              ) : (
                isEditing ? 'Salvar Alterações' : 'Criar Região'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 