import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const RegionUpdateSchema = z.object({
  name: z.string().min(1, "Nome da região é obrigatório"),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
})

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const region = await prisma.region.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            imoveis: true
          }
        }
      }
    })

    if (!region) {
      return NextResponse.json({ message: 'Região não encontrada.' }, { status: 404 })
    }

    return NextResponse.json(region)
  } catch (error) {
    console.error('Error fetching region:', error)
    return NextResponse.json(
      { message: 'Ocorreu um erro no servidor.' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    // Validate request body
    const validationResult = RegionUpdateSchema.safeParse(body)

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

    // Check if region exists
    const existingRegion = await prisma.region.findUnique({
      where: { id }
    })

    if (!existingRegion) {
      return NextResponse.json({ message: 'Região não encontrada.' }, { status: 404 })
    }

    // Check if name is already used by another region
    const duplicateRegion = await prisma.region.findFirst({
      where: {
        name: validatedData.name,
        id: { not: id }
      }
    })

    if (duplicateRegion) {
      return NextResponse.json(
        { message: 'Uma região com este nome já existe' },
        { status: 409 }
      )
    }

    // Update region
    const updatedRegion = await prisma.region.update({
      where: { id },
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

    return NextResponse.json({
      message: 'Região atualizada com sucesso',
      region: updatedRegion
    })
  } catch (error) {
    console.error('Error updating region:', error)
    return NextResponse.json(
      { message: 'Ocorreu um erro no servidor.' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // Check if region exists
    const existingRegion = await prisma.region.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            imoveis: true
          }
        }
      }
    })

    if (!existingRegion) {
      return NextResponse.json({ message: 'Região não encontrada.' }, { status: 404 })
    }

    // Check if region has associated properties
    if (existingRegion._count.imoveis > 0) {
      return NextResponse.json(
        {
          message: `Não é possível excluir esta região pois ela possui ${existingRegion._count.imoveis} imóvel(is) associado(s).`
        },
        { status: 409 }
      )
    }

    // Delete region
    await prisma.region.delete({
      where: { id }
    })

    return NextResponse.json({
      message: 'Região excluída com sucesso'
    })
  } catch (error) {
    console.error('Error deleting region:', error)
    return NextResponse.json(
      { message: 'Ocorreu um erro no servidor.' },
      { status: 500 }
    )
  }
} 