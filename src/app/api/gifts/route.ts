import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const gifts = await prisma.gift.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(gifts)
  } catch (error) {
    console.error('Error fetching gifts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch gifts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, image, description, categoryId } = body

    if (!name || !categoryId) {
      return NextResponse.json(
        { error: 'Name and category are required' },
        { status: 400 }
      )
    }

    const gift = await prisma.gift.create({
      data: {
        name,
        image: image || '/gifts/default.jpg',
        description,
        categoryId,
      },
      include: {
        category: true,
      },
    })

    return NextResponse.json(gift, { status: 201 })
  } catch (error) {
    console.error('Error creating gift:', error)
    return NextResponse.json(
      { error: 'Failed to create gift' },
      { status: 500 }
    )
  }
} 