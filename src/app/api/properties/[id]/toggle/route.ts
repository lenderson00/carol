import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // Check if property exists
    const existingProperty = await prisma.imovel.findUnique({
      where: { id },
      select: {
        id: true,
        nameImovel: true,
        isActive: true
      }
    })

    if (!existingProperty) {
      return NextResponse.json(
        { message: 'Imóvel não encontrado.' },
        { status: 404 }
      )
    }

    // Toggle the isActive status
    const updatedProperty = await prisma.imovel.update({
      where: { id },
      data: {
        isActive: !existingProperty.isActive,
      },
      select: {
        id: true,
        nameImovel: true,
        isActive: true,
      }
    })

    const action = updatedProperty.isActive ? 'ativado' : 'desativado'

    return NextResponse.json({
      message: `Imóvel ${action} com sucesso`,
      property: updatedProperty
    })

  } catch (error) {
    console.error('Error toggling property status:', error)
    return NextResponse.json(
      { message: 'Ocorreu um erro no servidor.' },
      { status: 500 }
    )
  }
} 