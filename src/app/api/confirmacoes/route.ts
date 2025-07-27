import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, email, familyNumber, status, message } = body

    if (!name || !phone || !email || !status) {
      return NextResponse.json(
        { error: "Campos obrigatórios não preenchidos" },
        { status: 400 }
      )
    }

    const confirmation = await prisma.inviteConfirmation.create({
      data: {
        name,
        phone,
        email,
        familyNumber: familyNumber || 1,
        status: status as "CONFIRMED" | "REJECTED",
        message: message || null,
      },
    })

    return NextResponse.json(
      { message: "Confirmação criada com sucesso", confirmation },
      { status: 201 }
    )
  } catch (error) {
    console.error("Erro ao criar confirmação:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const confirmations = await prisma.inviteConfirmation.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(confirmations)
  } catch (error) {
    console.error("Erro ao buscar confirmações:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
} 