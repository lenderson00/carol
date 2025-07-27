import { z } from "zod"

export const PropertyStatusEnum = z.enum(["PRONTO_PARA_MORAR", "EM_OBRAS", "LANCAMENTO"])
export const PropertyTypeEnum = z.enum(["APARTAMENTO", "CASA", "COMERCIAL"])

export const PropertySchema = z.object({
  nameImovel: z.string().min(1, "Nome do imóvel é obrigatório"),
  regionId: z.string().min(1, "Região é obrigatória"),
  banner: z.string().url("Banner deve ser uma URL válida"),
  bannerType: z.enum(["IMAGE", "VIDEO"]).default("IMAGE"),
  city: z.string().min(1, "Cidade é obrigatória"),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  status: PropertyStatusEnum,
  type: PropertyTypeEnum,
  curyOriginalLink: z.string().url("Link Cury Original deve ser uma URL válida"),
  isActive: z.boolean().default(true),
  units: z.object({
    studio: z.boolean(),
    oneBedroom: z.boolean(),
    twoBedrooms: z.boolean(),
    threeBedrooms: z.boolean(),
  }),
  highlights: z.array(z.string()).min(1, "Pelo menos um destaque é obrigatório"),
  amenities: z.array(z.string()).min(1, "Pelo menos uma comodidade é obrigatória"),
  media: z.object({
    images: z.array(z.string().url("Imagem deve ser uma URL válida")),
    videos: z.array(z.string().url("Vídeo deve ser uma URL válida")).optional(),
  }),
  address: z.object({
    standAddress: z.string().min(1, "Endereço do stand é obrigatório"),
    siteAddress: z.string().min(1, "Endereço do local é obrigatório"),
  }),
  regionAbout: z.string().min(1, "Descrição da região é obrigatória"),
})

export type PropertyFormData = z.infer<typeof PropertySchema>

// Helper functions for displaying enum values
export const getStatusLabel = (status: string) => {
  switch (status) {
    case 'PRONTO_PARA_MORAR': return 'Pronto para Morar'
    case 'EM_OBRAS': return 'Em obras'
    case 'LANCAMENTO': return 'Lançamento'
    default: return status
  }
}

export const getTypeLabel = (type: string) => {
  switch (type) {
    case 'APARTAMENTO': return 'Apartamento'
    case 'CASA': return 'Casa'
    case 'COMERCIAL': return 'Comercial'
    default: return type
  }
}

export const PROPERTY_STATUS_OPTIONS = [
  { value: 'PRONTO_PARA_MORAR', label: 'Pronto para Morar' },
  { value: 'EM_OBRAS', label: 'Em obras' },
  { value: 'LANCAMENTO', label: 'Lançamento' },
] as const

export const PROPERTY_TYPE_OPTIONS = [
  { value: 'APARTAMENTO', label: 'Apartamento' },
  { value: 'CASA', label: 'Casa' },
  { value: 'COMERCIAL', label: 'Comercial' },
] as const 