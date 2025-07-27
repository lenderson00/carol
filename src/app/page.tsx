"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Calendar, MapPin, Clock, Users, Heart, Gift, Camera, QrCode, ArrowRight } from "lucide-react"
import { PhotoGallery } from "@/components/photo-gallery"
import { SnowParticles } from "@/components/snow-particles"




// Gift categories
const giftCategories = [
  {
    title: "Perfumes",
    items: [
      "Rosa e Algodão (O Boticário)",
      "Pessegura (O Boticário)",
      "Coffee Women Seduction (O Boticário)",
      "Bendito Cacto (O Boticário)",
      "Liz (O Boticário)",
      "Glamour (O Boticário)",
      "Glamour Gold Glam (O Boticário)",
      "Creme Esfoliante de Coco (O Boticário)",
      "Nuvem de Alegria - Loção Desodorante (O Boticário)",
      "Nuvem de Alegria - Body Splash (O Boticário)",
      "Blue (FLORATTA)",
      "E.joy (EGEO)",
      "Vanilla Vibe (EGEO)"
    ]
  },
  {
    title: "Sapatos",
    items: [
      "CROCS - Tênis",
      "Papete - Número 37",
      "Sugestões: Crocs, Constance, Melissa, Nike, Adidas, Puma, Fila"
    ]
  },
  {
    title: "Roupas",
    items: [
      "Blusas P",
      "Short - Número 40",
      "Calça Wide Leg - 40",
      "Sugestões: Aquamar, C&A, Riachuelo, Zara, Constance"
    ]
  },
  {
    title: "Acessórios",
    items: [
      "Anel (Número 16 ou 17)",
      "Brincos",
      "Pulseiras",
      "Bolsas",
      "Óculos de Sol",
      "Berloques",
      "Sugestões: Loja Prata e Cor, Loja Complemento"
    ]
  }
]

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    familyNumber: 1,
    status: "CONFIRMED",
    message: ""
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/confirmacoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success("Confirmação enviada com sucesso!")
        setFormData({
          name: "",
          phone: "",
          email: "",
          familyNumber: 1,
          status: "CONFIRMED",
          message: ""
        })
      } else {
        toast.error("Erro ao enviar confirmação")
      }
    } catch (error) {
      toast.error("Erro ao enviar confirmação")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <SnowParticles />
      
      {/* Hero Section */}
      <div className="relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                <span className="text-primary">
                  Carol
                </span>
                <br />
                <span className="text-gray-700">15 Anos</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-light text-primary mb-4">
                Baile de Inverno
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Uma noite mágica de festa, dança e momentos inesquecíveis
              </p>
            </div>
            
            {/* Event Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-3 bg-gray-50 rounded-lg p-4 border border-gray-200">
                <Calendar className="h-6 w-6 text-primary" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Data</p>
                  <p className="text-gray-600">21 de Novembro, 2025</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3 bg-gray-50 rounded-lg p-4 border border-gray-200">
                <Clock className="h-6 w-6 text-primary" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Horário</p>
                  <p className="text-gray-600">21:00 às 02:00</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3 bg-gray-50 rounded-lg p-4 border border-gray-200">
                <MapPin className="h-6 w-6 text-primary" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Local</p>
                  <p className="text-gray-600">Av. Brás de Pina, 1867</p>
                  <p className="text-gray-600 text-sm">Vista Alegre, Rio de Janeiro</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Traje</h3>
              <p className="text-gray-600">Esporte Fino</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pix Section */}
      <div className="relative z-20 bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Vai me dar presente?
            </h2>
            <p className="text-xl text-primary font-semibold mb-8">
              Manda um pix!
            </p>
            <p className="text-gray-600 mb-8">
              É só usar o número de celular (21) 972629125 ou o QR Code.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* QR Code Placeholder */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <QrCode className="h-24 w-24 text-gray-400" />
              </div>
              <p className="text-center text-sm text-gray-500 mt-4">QR Code Pix</p>
            </div>

            {/* Phone Number */}
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Número do Pix</h3>
                <p className="text-2xl font-bold text-primary">(21) 972629125</p>
                <p className="text-sm text-gray-500 mt-2">Carol</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gift List Section */}
      <div className="relative z-20 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gray-600 mb-4">
              Você também pode acessar a lista de sugestões de presentes
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3">
              Ver Lista de Presentes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {giftCategories.map((category, index) => (
              <Card key={index} className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-primary">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-600">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Photo Gallery Section */}
      <div className="relative z-20 bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Camera className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Fotos da Carol
            </h2>
            <p className="text-gray-600 text-lg">
              Momentos especiais da nossa aniversariante
            </p>
          </div>

          <PhotoGallery />
        </div>
      </div>

      {/* Confirmation Form Section */}
      <div className="relative z-20 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg border border-gray-200">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">
                Confirme sua Presença
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Ajude-nos a organizar essa festa especial confirmando sua presença
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Nome Completo</label>
                    <Input
                      type="text"
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="border-gray-300 focus:border-primary focus:ring-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Telefone</label>
                    <Input
                      type="tel"
                      placeholder="(21) 99999-9999"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                      className="border-gray-300 focus:border-primary focus:ring-primary"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">E-mail</label>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="border-gray-300 focus:border-primary focus:ring-primary"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Número de Pessoas</label>
                    <Select 
                      value={formData.familyNumber.toString()} 
                      onValueChange={(value) => setFormData({...formData, familyNumber: parseInt(value)})}
                    >
                      <SelectTrigger className="border-gray-300 focus:border-primary focus:ring-primary">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'pessoa' : 'pessoas'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Confirmação</label>
                    <div className="flex gap-4">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="status"
                          value="CONFIRMED"
                          checked={formData.status === "CONFIRMED" || formData.status === ""}
                          onChange={(e) => setFormData({...formData, status: e.target.value})}
                          className="text-primary focus:ring-primary border-gray-300"
                        />
                        <span className="text-sm text-gray-700">Sim</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="status"
                          value="REJECTED"
                          checked={formData.status === "REJECTED"}
                          onChange={(e) => setFormData({...formData, status: e.target.value})}
                          className="text-primary focus:ring-primary border-gray-300"
                        />
                        <span className="text-sm text-gray-700">Não</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Mensagem (opcional)</label>
                  <Textarea
                    placeholder="Deixe uma mensagem especial para a Carol..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                    className="border-gray-300 focus:border-primary focus:ring-primary"
                  />
                </div>
                
                <div className="text-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isSubmitting ? "Enviando..." : "Confirmar Presença"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg">
            Com muito carinho, família da Carol
          </p>
          <p className="text-gray-400 mt-2">
            Uma celebração especial dos 15 anos - Baile de Inverno
          </p>
        </div>
      </footer>


    </div>
  )
}
