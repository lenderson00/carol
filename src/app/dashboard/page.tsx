"use client"


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import DashboardStats from "@/components/dashboard-stats"
import Link from "next/link"
import { Image, Users, Heart, Gift } from "lucide-react"

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard - Festa de 15 Anos"
        subtitle="Gerencie a festa de 15 anos da Carol"
      />
      
      <main className="flex flex-1 flex-col gap-6 p-4 lg:gap-8 lg:p-6 max-w-7xl mx-auto">
        {/* Dashboard Statistics */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Estatísticas da Festa</h2>
          <DashboardStats />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumo da Festa</CardTitle>
              <CardDescription>Estatísticas gerais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Data da Festa:</span>
                  <span className="font-medium">15 de Março, 2025</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Horário:</span>
                  <span className="font-medium">20:00 às 02:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Local:</span>
                  <span className="font-medium">Espaço de Eventos</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Links Úteis</CardTitle>
              <CardDescription>Acesso rápido</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link href="/" className="block">
                  <Button variant="outline" className="w-full justify-start">
                  <Heart className="mr-2 h-4 w-4" />
                    Página Principal
                  </Button>
                </Link>
                <Link href="/dashboard/images" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Image className="mr-2 h-4 w-4" />
                    Galeria de Fotos
                  </Button>
                </Link>
                <Link href="/dashboard/confirmacoes" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Confirmações
                  </Button>
                </Link>
                <Link href="/dashboard/presentes" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Gift className="mr-2 h-4 w-4" />
                    Lista de Presentes
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
