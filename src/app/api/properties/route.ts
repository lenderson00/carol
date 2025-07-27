import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PropertySchema } from '@/lib/validations/property'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request body with Zod schema
    const validationResult = PropertySchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: 'Validation error',
          errors: validationResult.error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message
          }))
        },
        { status: 400 }
      )
    }

    const validatedData = validationResult.data

    // Create property with all related data
    const property = await prisma.imovel.create({
      data: {
        nameImovel: validatedData.nameImovel,
        regionId: validatedData.regionId,
        banner: validatedData.banner,
        bannerType: validatedData.bannerType,
        city: validatedData.city,
        neighborhood: validatedData.neighborhood,
        description: validatedData.description,
        status: validatedData.status,
        type: validatedData.type,
        curyOriginalLink: validatedData.curyOriginalLink,
        isActive: validatedData.isActive,
        highlights: validatedData.highlights.filter((h: string) => h.trim() !== ''),
        amenities: validatedData.amenities.filter((a: string) => a.trim() !== ''),
        regionAbout: validatedData.regionAbout,

        // Create Units
        units: {
          create: {
            studio: validatedData.units.studio,
            oneBedroom: validatedData.units.oneBedroom,
            twoBedrooms: validatedData.units.twoBedrooms,
            threeBedrooms: validatedData.units.threeBedrooms,
          }
        },

        // Create Address
        address: {
          create: {
            standAddress: validatedData.address.standAddress,
            siteAddress: validatedData.address.siteAddress,
          }
        },

        // Create Media
        Media: {
          create: {
            images: {
              create: validatedData.media.images
                .filter((img: string) => img && img.trim() !== '')
                .map((url: string) => ({
                  name: url.split('/').pop()?.split('?')[0] || `image-${Date.now()}`,
                  url,
                })),
            },
            videos: validatedData.media.videos?.filter((vid: string) => vid && vid.trim() !== '') || [],
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
        message: 'Property registered successfully',
        property
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error registering property:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const properties = await prisma.imovel.findMany({
      include: {
        units: true,
        address: true,
        Region: true,
        Media: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(properties)
  } catch (error) {
    console.error('Error fetching properties:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 