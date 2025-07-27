"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/page-header"

import { CheckCircle, XCircle, Users, MessageCircle, Calendar } from "lucide-react"

interface InviteConfirmation {
  id: string
  name: string
  phone: string
  email: string
  status: "CONFIRMED" | "REJECTED" | null
  familyNumber: number
  message: string | null
  createdAt: string
}

export default function ConfirmacoesPage() {
  const [confirmations, setConfirmations] = useState<InviteConfirmation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchConfirmations()
  }, [])

  const fetchConfirmations = async () => {
    try {
      const response = await fetch("/api/confirmacoes")
      if (response.ok) {
        const data = await response.json()
        setConfirmations(data)
      }
    } catch (error) {
      console.error("Erro ao buscar confirmações:", error)
    } finally {
      setLoading(false)
    }
  }

  const confirmedCount = confirmations.filter(c => c.status === "CONFIRMED").length
  const rejectedCount = confirmations.filter(c => c.status === "REJECTED").length
  const totalGuests = confirmations
    .filter(c => c.status === "CONFIRMED")
    .reduce((sum, c) => sum + c.familyNumber, 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Carregando confirmações...</div>
      </div>
    )
  }

  return (
    <>
      <PageHeader
        title="Confirmações de Presença"
        subtitle="Gerencie todas as confirmações de convite para a festa."
      />
      
      <main className="flex flex-1 flex-col gap-6 p-4 lg:gap-8 lg:p-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmados</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{confirmedCount}</div>
              <p className="text-xs text-muted-foreground">
                Pessoas que confirmaram presença
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Não Confirmados</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
              <p className="text-xs text-muted-foreground">
                Pessoas que não poderão ir
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Convidados</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{totalGuests}</div>
              <p className="text-xs text-muted-foreground">
                Total de pessoas confirmadas
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Confirmations List */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Confirmações</CardTitle>
            <CardDescription>
              Todas as confirmações de presença recebidas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {confirmations.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhuma confirmação recebida ainda.
                </div>
              ) : (
                confirmations.map((confirmation) => (
                  <div
                    key={confirmation.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{confirmation.name}</h3>
                        <Badge
                          variant={confirmation.status === "CONFIRMED" ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {confirmation.status === "CONFIRMED" ? "Confirmado" : "Não Confirmado"}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{confirmation.phone}</span>
                        <span>{confirmation.email}</span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {confirmation.familyNumber} {confirmation.familyNumber === 1 ? 'pessoa' : 'pessoas'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(confirmation.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>

                      {confirmation.message && (
                        <div className="mt-2 flex items-start gap-2 text-sm">
                          <MessageCircle className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <p className="text-muted-foreground italic">
                            &quot;{confirmation.message}&quot;
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  )
}