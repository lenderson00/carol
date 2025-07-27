import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const images = await prisma.images.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(images)
  } catch (error) {
    console.error("Erro ao buscar imagens:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, url } = body

    if (!name || !url) {
      return NextResponse.json(
        { error: "Nome e URL são obrigatórios" },
        { status: 400 }
      )
    }

    const image = await prisma.images.create({
      data: {
        name,
        url,
      },
    })

    return NextResponse.json(
      { message: "Imagem criada com sucesso", image },
      { status: 201 }
    )
  } catch (error) {
    console.error("Erro ao criar imagem:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
} 