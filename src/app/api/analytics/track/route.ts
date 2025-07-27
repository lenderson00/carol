import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { page, ipAddress, userAgent, referrer } = await request.json()

    if (!page) {
      return NextResponse.json(
        { error: 'Page parameter is required' },
        { status: 400 }
      )
    }

    const analytics = await prisma.pageAnalytics.create({
      data: {
        page,
        ipAddress: ipAddress || null,
        userAgent: userAgent || null,
        referrer: referrer || null
      }
    })

    return NextResponse.json({ success: true, id: analytics.id })
  } catch (error) {
    console.error('Error tracking analytics:', error)
    return NextResponse.json(
      { error: 'Failed to track analytics' },
      { status: 500 }
    )
  }
} 