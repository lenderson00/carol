"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowDown, ArrowUp, MoreHorizontal, Settings, Share2, Trash, TriangleAlert, Pin, Users, CheckCircle, XCircle, Eye } from "lucide-react"

interface DashboardStats {
  totalInvites: number
  confirmedInvites: number
  rejectedInvites: number
  pendingInvites: number
  dashboardPageViews: number
  lastMonthInvites: number
  lastMonthViews: number
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
    dashboardPageViews: 0,
    lastMonthInvites: 0,
    lastMonthViews: 0
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
      title: 'Total de Convites',
      value: stats.totalInvites,
      delta: stats.totalInvites > stats.lastMonthInvites ? 
        ((stats.totalInvites - stats.lastMonthInvites) / stats.lastMonthInvites * 100) : 0,
      lastMonth: stats.lastMonthInvites,
      positive: stats.totalInvites >= stats.lastMonthInvites,
      prefix: '',
      suffix: '',
      icon: Users
    },
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
      title: 'Visualizações do Dashboard',
      value: stats.dashboardPageViews,
      delta: stats.dashboardPageViews > stats.lastMonthViews ? 
        ((stats.dashboardPageViews - stats.lastMonthViews) / stats.lastMonthViews * 100) : 0,
      lastMonth: stats.lastMonthViews,
      positive: stats.dashboardPageViews >= stats.lastMonthViews,
      prefix: '',
      suffix: '',
      icon: Eye
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
            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="bottom">
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Configurações
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <TriangleAlert className="mr-2 h-4 w-4" />
                    Adicionar Alerta
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Pin className="mr-2 h-4 w-4" />
                    Fixar no Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartilhar
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Remover
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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