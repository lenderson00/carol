import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json(
        { error: "ID da imagem é obrigatório" },
        { status: 400 }
      )
    }

    const image = await prisma.images.findUnique({
      where: { id },
    })

    if (!image) {
      return NextResponse.json(
        { error: "Imagem não encontrada" },
        { status: 404 }
      )
    }

    await prisma.images.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: "Imagem deletada com sucesso" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Erro ao deletar imagem:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
} 