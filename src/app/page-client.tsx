"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Calendar, MapPin, Clock, Heart, Camera, QrCode, ArrowRight, Gift } from "lucide-react"
import { PhotoGallery } from "@/components/photo-gallery"
import Navbar from "@/components/navbar"
import Snowfall from 'react-snowfall'
import { BlurFade } from "@/components/magicui/blur-fade"

interface Image {
  id: string
  name: string
  url: string
  createdAt: Date
  updatedAt: Date
}

interface HomeClientProps {
  images: Image[]
}



export default function HomeClient({ images }: HomeClientProps) {
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
    } catch {
      toast.error("Erro ao enviar confirmação")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen winter-gradient relative overflow-hidden">
      <Navbar />
      <Snowfall
  // Changes the snowflake color
  color="white"
  // Applied to the canvas element
  style={{ background: 'transparent' }}
  // Controls the number of snowflakes that are created (default 150)
  snowflakeCount={100}
/>
      {/* Hero Section */}
      <div className="relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="mb-8">
              <BlurFade delay={0.1}>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                  <span className="winter-text-gradient">
                    Carol
                  </span>
                  <br />
                  <span className="text-white/90">15 Anos</span>
                </h1>
              </BlurFade>
              <BlurFade delay={0.2}>
                <h2 className="text-2xl md:text-3xl font-light text-primary mb-4">
                  Baile de Inverno
                </h2>
              </BlurFade>
              <BlurFade delay={0.3}>
                <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                  Uma noite mágica de festa, dança e momentos inesquecíveis
                </p>
              </BlurFade>
            </div>
            
            {/* Event Details */}
            <BlurFade delay={0.4}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
                <div className="flex items-center justify-center space-x-3 winter-card rounded-lg p-4">
                  <Calendar className="h-6 w-6 text-primary" />
                  <div className="text-left">
                    <p className="font-semibold text-white">Data</p>
                    <p className="text-white/80">21 de Novembro, 2025</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center space-x-3 winter-card rounded-lg p-4">
                  <Clock className="h-6 w-6 text-primary" />
                  <div className="text-left">
                    <p className="font-semibold text-white">Horário</p>
                    <p className="text-white/80">21:00 às 02:00</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center space-x-3 winter-card rounded-lg p-4">
                  <MapPin className="h-6 w-6 text-primary" />
                  <div className="text-left">
                    <p className="font-semibold text-white">Local</p>
                    <p className="text-white/80">Av. Brás de Pina, 1867</p>
                    <p className="text-white/80 text-sm">Vista Alegre, Rio de Janeiro</p>
                  </div>
                </div>
              </div>
            </BlurFade>

            <BlurFade delay={0.5}>
              <div className="winter-card rounded-lg p-6 max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold text-white mb-2">Traje</h3>
                <p className="text-white/80">Esporte Fino</p>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>

      {/* Pix Section */}
      <div className="relative z-20 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <BlurFade delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Vai me dar presente?
              </h2>
            </BlurFade>
            <BlurFade delay={0.2}>
              <p className="text-xl text-primary font-semibold mb-8">
                Manda um pix!
              </p>
            </BlurFade>
            <BlurFade delay={0.3}>
              <p className="text-white/80 mb-8">
                É só usar o número de celular (21) 972629125 ou o QR Code.
              </p>
            </BlurFade>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* QR Code Placeholder */}
            <BlurFade delay={0.4}>
              <div className="winter-card p-8 rounded-lg">
                <div className="w-48 h-48 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                  <QrCode className="h-24 w-24 text-white/60" />
                </div>
                <p className="text-center text-sm text-white/60 mt-4">QR Code Pix</p>
              </div>
            </BlurFade>

            {/* Phone Number */}
            <BlurFade delay={0.5}>
              <div className="text-center">
                <div className="winter-card p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">Número do Pix</h3>
                  <p className="text-2xl font-bold text-primary">(21) 972629125</p>
                  <p className="text-sm text-white/60 mt-2">Carol</p>
                </div>
              </div>
            </BlurFade>
          </div>

          {/* Gift List Link */}
          <BlurFade delay={0.6}>
            <div className="text-center mt-8">
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3">
                <a href="/lista">
                  <Gift className="mr-2 h-4 w-4" />
                  Ver Lista Completa de Presentes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </BlurFade>
        </div>
      </div>



      {/* Photo Gallery Section */}
      <div className="relative z-20 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <BlurFade delay={0.1}>
              <Camera className="mx-auto h-12 w-12 text-primary mb-4" />
            </BlurFade>
            <BlurFade delay={0.2}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Fotos da Carol
              </h2>
            </BlurFade>
            <BlurFade delay={0.3}>
              <p className="text-white/80 text-lg">
                Momentos especiais da nossa aniversariante
              </p>
            </BlurFade>
          </div>

          <BlurFade delay={0.4}>
            <PhotoGallery images={images} />
          </BlurFade>
        </div>
      </div>

      {/* Confirmation Form Section */}
      <div className="relative z-20 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.1}>
            <Card className="winter-card shadow-lg border-white/20">
              <CardHeader className="text-center">
                <BlurFade delay={0.2}>
                  <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                    <Heart className="h-8 w-8 text-primary-foreground" />
                  </div>
                </BlurFade>
                <BlurFade delay={0.3}>
                  <CardTitle className="text-3xl font-bold text-white">
                    Confirme sua Presença
                  </CardTitle>
                </BlurFade>
                <BlurFade delay={0.4}>
                  <CardDescription className="text-lg text-white/80">
                    Ajude-nos a organizar essa festa especial confirmando sua presença
                  </CardDescription>
                </BlurFade>
              </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Nome Completo</label>
                    <Input
                      type="text"
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary focus:ring-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Telefone</label>
                    <Input
                      type="tel"
                      placeholder="(21) 99999-9999"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary focus:ring-primary"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">E-mail</label>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary focus:ring-primary"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Número de Pessoas</label>
                    <Select 
                      value={formData.familyNumber.toString()} 
                      onValueChange={(value) => setFormData({...formData, familyNumber: parseInt(value)})}
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-primary focus:ring-primary">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-white/20">
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'pessoa' : 'pessoas'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Confirmação</label>
                    <div className="flex gap-4">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="status"
                          value="CONFIRMED"
                          checked={formData.status === "CONFIRMED" || formData.status === ""}
                          onChange={(e) => setFormData({...formData, status: e.target.value})}
                          className="text-primary focus:ring-primary border-white/20"
                        />
                        <span className="text-sm text-white">Sim</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="status"
                          value="REJECTED"
                          checked={formData.status === "REJECTED"}
                          onChange={(e) => setFormData({...formData, status: e.target.value})}
                          className="text-primary focus:ring-primary border-white/20"
                        />
                        <span className="text-sm text-white">Não</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Mensagem (opcional)</label>
                  <Textarea
                    placeholder="Deixe uma mensagem especial para a Carol..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary focus:ring-primary"
                  />
                </div>
                
                <div className="text-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isSubmitting ? "Enviando..." : "Confirmar Presença"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          </BlurFade>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/20 text-white py-12">
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