import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PropertyStatus, PropertyType } from '@prisma/client'

// Map legacy values to enum values
const mapStatusToEnum = (status: string): PropertyStatus => {
  const statusMap: Record<string, PropertyStatus> = {
    'Lançamento': PropertyStatus.LANCAMENTO,
    'Em Obras': PropertyStatus.EM_OBRAS,
    'Pronto para Morar': PropertyStatus.PRONTO_PARA_MORAR,
    'LANCAMENTO': PropertyStatus.LANCAMENTO,
    'EM_OBRAS': PropertyStatus.EM_OBRAS,
    'PRONTO_PARA_MORAR': PropertyStatus.PRONTO_PARA_MORAR
  }
  return statusMap[status] || PropertyStatus.EM_OBRAS // Default fallback
}

const mapTypeToEnum = (type: string): PropertyType => {
  const typeMap: Record<string, PropertyType> = {
    'Apartamento': PropertyType.APARTAMENTO,
    'Casa': PropertyType.CASA,
    'Comercial': PropertyType.COMERCIAL,
    'APARTAMENTO': PropertyType.APARTAMENTO,
    'CASA': PropertyType.CASA,
    'COMERCIAL': PropertyType.COMERCIAL
  }
  return typeMap[type] || PropertyType.APARTAMENTO // Default fallback
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      'nameImovel', 'region', 'banner', 'city', 'neighborhood',
      'description', 'status', 'type', 'units', 'highlights',
      'amenities', 'media', 'address', 'regionAbout'
    ]

    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === null) {
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Find or create region
    let region = await prisma.region.findFirst({
      where: { name: body.region }
    })

    if (!region) {
      region = await prisma.region.create({
        data: {
          name: body.region,
          description: `Região criada automaticamente durante importação`,
          isActive: true,
        }
      })
    }

    // Create property with all related data
    const property = await prisma.imovel.create({
      data: {
        nameImovel: body.nameImovel,
        regionId: region.id,
        banner: body.banner,
        city: body.city,
        neighborhood: body.neighborhood,
        description: body.description,
        status: mapStatusToEnum(body.status),
        type: mapTypeToEnum(body.type),
        curyOriginalLink: body.curyOriginalLink || `https://cury.com.br/imovel/${body.nameImovel.toLowerCase().replace(/\s+/g, '-')}`,
        isActive: body.isActive !== undefined ? body.isActive : true,
        highlights: body.highlights.filter((h: string) => h && h.trim() !== ''),
        amenities: body.amenities.filter((a: string) => a && a.trim() !== ''),
        regionAbout: body.regionAbout,

        units: {
          create: {
            studio: body.units.studio,
            oneBedroom: body.units.oneBedroom,
            twoBedrooms: body.units.twoBedrooms,
            threeBedrooms: body.units.threeBedrooms,
          }
        },

        address: {
          create: {
            standAddress: body.address.standAddress,
            siteAddress: body.address.siteAddress,
          }
        },

        Media: {
          create: {
            images: {
              create: body.media.images
                .filter((img: string) => img && img.trim() !== "")
                .map((url: string) => ({
                  name: url.split("/").pop()?.split("?")[0] || `image-${Date.now()}`,
                  url,
                })),
            },
            videos: body.media.videos.filter((vid: string) => vid && vid.trim() !== ""),
          },
        }
      },
      include: {
        units: true,
        address: true,
        Media: true,
      }
    })

    return NextResponse.json(
      {
        message: 'Property imported successfully',
        property
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error importing property:', error)
    return NextResponse.json(
      { message: 'Internal server error during import' },
      { status: 500 }
    )
  }
} 