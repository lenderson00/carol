"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import DashboardStats from "@/components/dashboard-stats"
import { useAnalytics } from "@/hooks/use-analytics"
import Link from "next/link"
import { Image, Users, Calendar, Heart, ArrowRight } from "lucide-react"

export default function DashboardPage() {
  useAnalytics()

  return (
    <>
      <PageHeader
        title="Dashboard - Festa de 15 Anos"
        subtitle="Gerencie a festa de 15 anos da Carol"
      />
      
      <main className="flex flex-1 flex-col gap-6 p-4 lg:gap-8 lg:p-6">
        {/* Dashboard Statistics */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Estatísticas da Festa</h2>
          <DashboardStats />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Galeria de Fotos */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg">
                  <Image className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle>Galeria de Fotos</CardTitle>
                  <CardDescription>Gerencie as fotos da festa</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Faça upload, organize e compartilhe as fotos da festa de 15 anos da Carol.
              </p>
              <Link href="/dashboard/images">
                <Button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
                  Gerenciar Fotos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Confirmações */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle>Confirmações</CardTitle>
                  <CardDescription>Gerencie as confirmações de presença</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Visualize e gerencie todas as confirmações de presença dos convidados.
              </p>
              <Link href="/dashboard/confirmacoes">
                <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  Ver Confirmações
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Informações da Festa */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle>Informações da Festa</CardTitle>
                  <CardDescription>Detalhes do evento</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-purple-600" />
                  <span>15 de Março, 2025</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-purple-600" />
                  <span>20:00 às 02:00</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span>Espaço de Eventos</span>
                </div>
              </div>
            </CardContent>
          </Card>
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
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
