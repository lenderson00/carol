"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PropertyCardSkeleton } from "./property-card-skeleton"
import { EmptyCard } from "./empty-card"
import { Building2, AlertTriangle, ExternalLink, Power, PowerOff } from "lucide-react"
import Link from "next/link"
import { getStatusLabel, getTypeLabel } from "@/lib/validations/property"

interface Property {
  id: string
  nameImovel: string
  banner: string
  bannerType: 'IMAGE' | 'VIDEO'
  city: string
  neighborhood: string
  description: string
  status: string
  type: string
  curyOriginalLink: string
  isActive: boolean
  highlights: string[]
  amenities: string[]
  regionAbout: string
  createdAt: string
  Region?: {
    id: string
    name: string
  }
  units: {
    studio: boolean
    oneBedroom: boolean
    twoBedrooms: boolean
    threeBedrooms: boolean
  }
  address: {
    standAddress: string
    siteAddress: string
  }
  Media: {
    images: string[]
    videos: string[]
  }[]
}

export function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [toggling, setToggling] = useState<string | null>(null)

  const fetchProperties = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/properties')
      if (response.ok) {
        const data = await response.json()
        setProperties(data)
      } else {
        setError('Falha ao buscar imóveis.')
      }
    } catch {
      setError('Ocorreu um erro ao buscar os imóveis.')
    } finally {
      setLoading(false)
    }
  }

  const togglePropertyStatus = async (propertyId: string, currentStatus: boolean) => {
    setToggling(propertyId)
    
    try {
      const response = await fetch(`/api/properties/${propertyId}/toggle`, {
        method: 'PATCH',
      })

      if (response.ok) {
        const result = await response.json()
        
        // Update the property in the list
        setProperties(prev => prev.map(prop => 
          prop.id === propertyId 
            ? { ...prop, isActive: !currentStatus }
            : prop
        ))
        
        toast.success(result.message)
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || 'Erro ao alterar status do imóvel')
      }
    } catch {
      toast.error('Erro ao alterar status do imóvel')
    } finally {
      setToggling(null)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <PropertyCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <EmptyCard
        title="Ocorreu um erro"
        description={error}
        icon={AlertTriangle}
        action={
          <Button onClick={fetchProperties} variant="outline">
            Tentar Novamente
          </Button>
        }
      />
    )
  }

  if (properties.length === 0) {
    return (
      <EmptyCard
        title="Nenhum imóvel encontrado"
        description="Comece cadastrando seu primeiro imóvel para vê-lo aqui."
        icon={Building2}
        action={
          <Link href="/dashboard/imoveis/new">
            <Button>Cadastrar Imóvel</Button>
          </Link>
        }
      />
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {properties.map((property) => (
        <Card key={property.id} className="flex flex-col overflow-hidden !pt-0">
          {property.banner && (
            <div className="aspect-video relative w-full overflow-hidden">
              {property.bannerType === 'VIDEO' ? (
                <video
                  src={property.banner}
                  className="w-full h-full object-cover"
                  muted
                  autoPlay
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={property.banner}
                  alt={property.nameImovel}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          )}
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg line-clamp-2">{property.nameImovel}</CardTitle>
                <CardDescription>
                  {getTypeLabel(property.type)} • {property.city}, {property.neighborhood}
                  {property.Region && ` • ${property.Region.name}`}
                </CardDescription>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <Badge variant={property.status === 'EM_OBRAS' ? 'destructive' : 'default'}>
                  {getStatusLabel(property.status)}
                </Badge>
                <Badge variant={property.isActive ? 'default' : 'secondary'} className="text-xs">
                  {property.isActive ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <p className="text-sm text-muted-foreground line-clamp-3">
              {property.description}
            </p>
            
            {/* Cury Original Link - Prominent Display */}
            {property.curyOriginalLink && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-orange-600 font-semibold text-sm">🔗 Link Cury Original</span>
                </div>
                <a
                  href={property.curyOriginalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-orange-700 hover:text-orange-800 hover:underline group"
                >
                  <span className="truncate flex-1">{property.curyOriginalLink}</span>
                  <ExternalLink className="h-3 w-3 shrink-0 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button
              variant={property.isActive ? "destructive" : "default"}
              size="sm"
              onClick={() => togglePropertyStatus(property.id, property.isActive)}
              disabled={toggling === property.id}
              className="flex-1"
            >
              {toggling === property.id ? (
                <>
                  <PowerOff className="mr-2 h-4 w-4 animate-pulse" />
                  Alterando...
                </>
              ) : property.isActive ? (
                <>
                  <PowerOff className="mr-2 h-4 w-4" />
                  Desativar
                </>
              ) : (
                <>
                  <Power className="mr-2 h-4 w-4" />
                  Ativar
                </>
              )}
            </Button>
            <Link href={`/dashboard/imoveis/edit/${property.id}`}>
              <Button variant="outline" size="sm">
                Editar
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
} 