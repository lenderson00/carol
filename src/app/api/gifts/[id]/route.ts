import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, image, description, categoryId } = body

    if (!name || !categoryId) {
      return NextResponse.json(
        { error: 'Name and category are required' },
        { status: 400 }
      )
    }

    const gift = await prisma.gift.update({
      where: { id: params.id },
      data: {
        name,
        image: image || '',
        description,
        categoryId,
      },
      include: {
        category: true,
      },
    })

    return NextResponse.json(gift)
  } catch (error) {
    console.error('Error updating gift:', error)
    return NextResponse.json(
      { error: 'Failed to update gift' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.gift.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Gift deleted successfully' })
  } catch (error) {
    console.error('Error deleting gift:', error)
    return NextResponse.json(
      { error: 'Failed to delete gift' },
      { status: 500 }
    )
  }
} 