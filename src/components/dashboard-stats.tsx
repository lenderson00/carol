"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, CheckCircle, XCircle, Home, List } from "lucide-react"

interface DashboardStats {
  totalInvites: number
  confirmedInvites: number
  rejectedInvites: number
  pendingInvites: number
  homePageViews: number
  listPageViews: number
  lastMonthInvites: number
  lastMonthHomeViews: number
  lastMonthListViews: number
}

function formatNumber(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return n.toLocaleString()
  return n.toString()
}

export default function DashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    totalInvites: 0,
    confirmedInvites: 0,
    rejectedInvites: 0,
    pendingInvites: 0,
    homePageViews: 0,
    listPageViews: 0,
    lastMonthInvites: 0,
    lastMonthHomeViews: 0,
    lastMonthListViews: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats')
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    fetchStats()
  }, [])

  const statsData = [
    {
      title: 'Confirmados',
      value: stats.confirmedInvites,
      delta: stats.confirmedInvites > 0 ? 
        (stats.confirmedInvites / stats.totalInvites * 100) : 0,
      lastMonth: stats.lastMonthInvites * 0.7, // Estimate
      positive: true,
      prefix: '',
      suffix: '',
      icon: CheckCircle
    },
    {
      title: 'Recusados',
      value: stats.rejectedInvites,
      delta: stats.rejectedInvites > 0 ? 
        (stats.rejectedInvites / stats.totalInvites * 100) : 0,
      lastMonth: stats.lastMonthInvites * 0.1, // Estimate
      positive: false,
      prefix: '',
      suffix: '',
      icon: XCircle
    },
    {
      title: 'Visualizações da Página Principal',
      value: stats.homePageViews,
      delta: stats.homePageViews > stats.lastMonthHomeViews ? 
        ((stats.homePageViews - stats.lastMonthHomeViews) / stats.lastMonthHomeViews * 100) : 0,
      lastMonth: stats.lastMonthHomeViews,
      positive: stats.homePageViews >= stats.lastMonthHomeViews,
      prefix: '',
      suffix: '',
      icon: Home
    },
    {
      title: 'Visualizações da Lista de Presentes',
      value: stats.listPageViews,
      delta: stats.listPageViews > stats.lastMonthListViews ? 
        ((stats.listPageViews - stats.lastMonthListViews) / stats.lastMonthListViews * 100) : 0,
      lastMonth: stats.lastMonthListViews,
      positive: stats.listPageViews >= stats.lastMonthListViews,
      prefix: '',
      suffix: '',
      icon: List
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="border-0">
            <CardTitle className="text-muted-foreground text-sm font-medium flex items-center gap-2">
              <stat.icon className="h-4 w-4" />
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl font-medium text-foreground tracking-tight">
                {stat.prefix + formatNumber(stat.value) + stat.suffix}
              </span>
              <Badge variant={stat.positive ? 'default' : 'destructive'} className="text-xs">
                {stat.delta > 0 ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
                {stat.delta.toFixed(1)}%
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground mt-2 border-t pt-2.5">
              Vs mês passado:{' '}
              <span className="font-medium text-foreground">
                {stat.prefix + formatNumber(stat.lastMonth) + stat.suffix}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 