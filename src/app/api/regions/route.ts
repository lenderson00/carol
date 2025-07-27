import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const RegionSchema = z.object({
  name: z.string().min(1, "Nome da região é obrigatório"),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
})

export async function GET() {
  try {
    const regions = await prisma.region.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        name: 'asc'
      },
      include: {
        _count: {
          select: {
            imoveis: true
          }
        }
      }
    })

    return NextResponse.json(regions)
  } catch (error) {
    console.error('Error fetching regions:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request body with Zod schema
    const validationResult = RegionSchema.safeParse(body)

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

    // Check if region name already exists
    const existingRegion = await prisma.region.findUnique({
      where: { name: validatedData.name }
    })

    if (existingRegion) {
      return NextResponse.json(
        { message: 'Uma região com este nome já existe' },
        { status: 409 }
      )
    }

    // Create region
    const region = await prisma.region.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        isActive: validatedData.isActive,
      },
      include: {
        _count: {
          select: {
            imoveis: true
          }
        }
      }
    })

    return NextResponse.json(
      {
        message: 'Região criada com sucesso',
        region
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error creating region:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 