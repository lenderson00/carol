import { prisma } from "@/lib/prisma"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Gift, Heart } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"

async function getGifts() {
  try {
    const gifts = await prisma.gift.findMany({
      include: {
        category: true,
      },
      orderBy: {
        category: {
          name: 'asc',
        },
      },
    })
    return gifts
  } catch (error) {
    console.error('Error fetching gifts:', error)
    return []
  }
}

async function getCategories() {
  try {
    const categories = await prisma.giftCategory.findMany({
      include: {
        _count: {
          select: {
            gifts: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })
    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export default async function ListaPage() {
  const gifts = await getGifts()
  const categories = await getCategories()

  // Group gifts by category
  const giftsByCategory = categories.map(category => ({
    ...category,
    gifts: gifts.filter(gift => gift.categoryId === category.id)
  }))

  return (
    <div className="min-h-screen winter-gradient relative overflow-hidden">
      <Navbar />
      
      {/* Main Content */}
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-white hover:text-primary hover:bg-white/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
            </div>
            
            <div className="mb-8">
              <Gift className="mx-auto h-16 w-16 text-primary mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Lista de Presentes
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Sugestões de presentes para a festa de 15 anos da Carol
              </p>
            </div>

            {/* Categories Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
              {categories.map((category) => (
                <div key={category.id} className="winter-card p-4 rounded-lg text-center">
                  <div className={`w-8 h-8 rounded-full ${category.color} mx-auto mb-2`}></div>
                  <p className="text-sm font-medium text-white">{category.name}</p>
                  <p className="text-xs text-white/60">{category._count.gifts} itens</p>
                </div>
              ))}
            </div>
          </div>

          {/* Gifts by Category */}
          <div className="space-y-12">
            {giftsByCategory.map((category) => (
              <div key={category.id} className="winter-card rounded-lg p-6">
                <div className="flex items-center mb-6">
                  <div className={`w-6 h-6 rounded-full ${category.color} mr-3`}></div>
                  <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                  <Badge className="ml-3 bg-white/20 text-white">
                    {category.gifts.length} {category.gifts.length === 1 ? 'item' : 'itens'}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.gifts.map((gift) => (
                    <Card key={gift.id} className="bg-white/10 border-white/20 hover:bg-white/20 transition-colors">
                      <div className="aspect-square relative overflow-hidden rounded-t-lg">
                        <img
                          src={gift.image}
                          alt={gift.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/gifts/default.jpg"
                          }}
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-white">{gift.name}</CardTitle>
                        {gift.description && (
                          <CardDescription className="text-white/80">
                            {gift.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {gifts.length === 0 && (
            <div className="text-center py-12">
              <Gift className="mx-auto h-16 w-16 text-white/40 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Nenhum presente encontrado</h3>
              <p className="text-white/60">A lista de presentes será atualizada em breve.</p>
            </div>
          )}

          {/* Back to Home */}
          <div className="text-center mt-12">
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3">
                <Heart className="mr-2 h-4 w-4" />
                Voltar para a Página Principal
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/20 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg">
            Com muito carinho, família da Carol
          </p>
          <p className="text-white/60 mt-2">
            Uma celebração especial dos 15 anos - Baile de Inverno
          </p>
        </div>
      </footer>
    </div>
  )
}