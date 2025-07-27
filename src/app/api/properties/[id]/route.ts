import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const property = await prisma.imovel.findUnique({
      where: { id },
      include: {
        units: true,
        address: true,
        Region: true,
        Media: {
          include: {
            images: true,
          },
        },
      },
    })

    if (!property) {
      return NextResponse.json({ message: 'Imóvel não encontrado.' }, { status: 404 })
    }

    const firstMedia = property.Media[0]

    // Flatten the Media structure for easier use on the client
    const simplifiedProperty = {
      ...property,
      media: {
        images: firstMedia?.images.map((img: { url: string }) => img.url) || [],
        videos: firstMedia?.videos || [],
      },
    }
    // Remove the original Media and _count objects
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { Media, ...rest } = simplifiedProperty

    return NextResponse.json(rest)
  } catch (error) {
    console.error('Error fetching property:', error)
    return NextResponse.json(
      { message: 'Ocorreu um erro no servidor.' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const {
      nameImovel,
      regionId,
      banner,
      bannerType,
      city,
      neighborhood,
      description,
      status,
      type,
      curyOriginalLink,
      isActive,
      units,
      highlights,
      amenities,
      media,
      address,
      regionAbout,
    } = body

    const unitsData = {
      studio: units.studio,
      oneBedroom: units.oneBedroom,
      twoBedrooms: units.twoBedrooms,
      threeBedrooms: units.threeBedrooms,
    };

    const addressData = {
      standAddress: address.standAddress,
      siteAddress: address.siteAddress,
    };

    const mediaId = (await prisma.imovel.findUnique({
      where: { id },
      select: { Media: { select: { id: true } } },
    }))?.Media[0]?.id

    const updatedProperty = await prisma.imovel.update({
      where: { id },
      data: {
        nameImovel,
        regionId,
        banner,
        bannerType,
        city,
        neighborhood,
        description,
        status,
        type,
        curyOriginalLink,
        isActive,
        highlights,
        amenities,
        regionAbout,
        units: {
          update: unitsData,
        },
        address: {
          update: addressData,
        },
        Media: mediaId
          ? {
            update: {
              where: { id: mediaId },
              data: {
                images: {
                  deleteMany: {}, // Clear existing images
                  create: media.images
                    .filter((img: string) => img && img.trim() !== '')
                    .map((url: string) => ({
                      name:
                        url.split('/').pop()?.split('?')[0] ||
                        `image-${Date.now()}`,
                      url,
                    })),
                },
                videos: media.videos,
              },
            },
          }
          : undefined,
      },
    })

    return NextResponse.json(updatedProperty)
  } catch (error) {
    console.error('Error updating property:', error)
    if (error instanceof Error) {
      // You can check for specific Prisma errors here if needed
      return NextResponse.json({ message: error.message }, { status: 400 })
    }
    return NextResponse.json(
      { message: 'Ocorreu um erro no servidor.' },
      { status: 500 }
    )
  }
} 