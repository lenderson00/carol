"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Gift, Edit, Trash2, Loader2 } from "lucide-react"
import { useGifts } from "@/hooks/use-gifts"
import ImageUpload from "@/components/image-upload"

export default function PresentesPage() {
  const { gifts, categories, loading, error, addGift, deleteGift, addCategory } = useGifts()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isAddGiftOpen, setIsAddGiftOpen] = useState(false)
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [newGift, setNewGift] = useState<{ name: string; image: string; description: string; categoryId: string }>({
    name: '',
    image: '',
    description: '',
    categoryId: ''
  })
  const [newCategory, setNewCategory] = useState<{ name: string; color: string }>({
    name: '',
    color: 'bg-gray-500'
  })

  const filteredGifts = selectedCategory === "all" 
    ? gifts 
    : gifts.filter(gift => gift.categoryId === selectedCategory)

  const handleAddGift = async () => {
    if (newGift.name && newGift.categoryId) {
      try {
        await addGift(newGift)
        setNewGift({ name: '', image: '', description: '', categoryId: '' })
        setIsAddGiftOpen(false)
      } catch (error) {
        console.error('Failed to add gift:', error)
      }
    }
  }

  const handleAddCategory = async () => {
    if (newCategory.name) {
      try {
        await addCategory(newCategory)
        setNewCategory({ name: '', color: 'bg-gray-500' })
        setIsAddCategoryOpen(false)
      } catch (error) {
        console.error('Failed to add category:', error)
      }
    }
  }

  const handleDeleteGift = async (id: string) => {
    try {
      await deleteGift(id)
    } catch (error) {
      console.error('Failed to delete gift:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Carregando presentes...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erro ao carregar presentes: {error}</p>
          <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <PageHeader
        title="Lista de Presentes"
        subtitle="Gerencie os presentes da festa de 15 anos da Carol"
      />
      
      <main className="flex flex-1 flex-col gap-6 p-4 lg:gap-8 lg:p-6">
        {/* Header with Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Categoria
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Nova Categoria</DialogTitle>
                  <DialogDescription>
                    Crie uma nova categoria para organizar os presentes.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category-name">Nome da Categoria</Label>
                    <Input
                      id="category-name"
                      value={newCategory.name || ""}
                      onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                      placeholder="Ex: Eletrônicos"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category-color">Cor</Label>
                    <Select value={newCategory.color} onValueChange={(value) => setNewCategory({...newCategory, color: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma cor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bg-blue-500">Azul</SelectItem>
                        <SelectItem value="bg-pink-500">Rosa</SelectItem>
                        <SelectItem value="bg-green-500">Verde</SelectItem>
                        <SelectItem value="bg-purple-500">Roxo</SelectItem>
                        <SelectItem value="bg-red-500">Vermelho</SelectItem>
                        <SelectItem value="bg-yellow-500">Amarelo</SelectItem>
                        <SelectItem value="bg-gray-500">Cinza</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddCategory}>
                    Adicionar Categoria
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isAddGiftOpen} onOpenChange={setIsAddGiftOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Presente
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Presente</DialogTitle>
                  <DialogDescription>
                    Adicione um novo presente à lista com imagem e detalhes.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="gift-name">Nome do Presente</Label>
                    <Input
                      id="gift-name"
                      value={newGift.name || ""}
                      onChange={(e) => setNewGift({...newGift, name: e.target.value})}
                      placeholder="Ex: iPhone 15"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="gift-image">Imagem</Label>
                    <ImageUpload
                      onImageChange={(imageUrl) => setNewGift({...newGift, image: imageUrl})}
                      currentImage={newGift.image}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="gift-category">Categoria</Label>
                    <Select value={newGift.categoryId} onValueChange={(value) => setNewGift({...newGift, categoryId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="gift-description">Descrição (opcional)</Label>
                    <Textarea
                      id="gift-description"
                      value={newGift.description || ""}
                      onChange={(e) => setNewGift({...newGift, description: e.target.value})}
                      placeholder="Descrição do presente..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddGiftOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddGift}>
                    Adicionar Presente
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Categories Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Card key={category.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <div className={`w-8 h-8 rounded-full ${category.color} mx-auto mb-2`}></div>
                <p className="text-sm font-medium">{category.name}</p>
                <p className="text-xs text-muted-foreground">
                  {category._count.gifts} presentes
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Gifts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGifts.map((gift) => (
            <Card key={gift.id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-square relative overflow-hidden rounded-t-lg">
                <img
                  src={gift.image}
                  alt={gift.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/gifts/default.jpg"
                  }}
                />
                <div className="absolute top-2 right-2">
                  <Badge className={`${gift.category.color} text-white`}>
                    {gift.category.name}
                  </Badge>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{gift.name}</CardTitle>
                {gift.description && (
                  <CardDescription>{gift.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDeleteGift(gift.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGifts.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Gift className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum presente encontrado</h3>
              <p className="text-muted-foreground mb-4">
                {selectedCategory === "all" 
                  ? "Adicione o primeiro presente à lista!" 
                  : "Nenhum presente nesta categoria."}
              </p>
              <Button onClick={() => setIsAddGiftOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Presente
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </>
  )
} 