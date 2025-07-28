import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Get current date and last month date
    const now = new Date()
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())

    // Fetch invitation statistics
    const [
      totalInvites,
      confirmedInvites,
      rejectedInvites,
      pendingInvites,
      lastMonthInvites,
      homePageViews,
      listPageViews,
      lastMonthHomeViews,
      lastMonthListViews
    ] = await Promise.all([
      // Total invites
      prisma.inviteConfirmation.count(),

      // Confirmed invites
      prisma.inviteConfirmation.count({
        where: { status: 'CONFIRMED' }
      }),

      // Rejected invites
      prisma.inviteConfirmation.count({
        where: { status: 'REJECTED' }
      }),

      // Pending invites (no status)
      prisma.inviteConfirmation.count({
        where: { status: null }
      }),

      // Last month invites
      prisma.inviteConfirmation.count({
        where: {
          createdAt: {
            gte: lastMonth,
            lt: new Date(now.getFullYear(), now.getMonth(), 1)
          }
        }
      }),

      // Home page views
      prisma.pageAnalytics.count({
        where: { page: 'home' }
      }),

      // List page views
      prisma.pageAnalytics.count({
        where: { page: 'list' }
      }),

      // Last month home views
      prisma.pageAnalytics.count({
        where: {
          page: 'home',
          createdAt: {
            gte: lastMonth,
            lt: new Date(now.getFullYear(), now.getMonth(), 1)
          }
        }
      }),

      // Last month list views
      prisma.pageAnalytics.count({
        where: {
          page: 'list',
          createdAt: {
            gte: lastMonth,
            lt: new Date(now.getFullYear(), now.getMonth(), 1)
          }
        }
      })
    ])

    const stats = {
      totalInvites,
      confirmedInvites,
      rejectedInvites,
      pendingInvites,
      homePageViews,
      listPageViews,
      lastMonthInvites,
      lastMonthHomeViews,
      lastMonthListViews
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    )
  }
} 