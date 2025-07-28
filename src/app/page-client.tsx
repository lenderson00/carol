"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Calendar, MapPin, Clock, Heart, Camera, QrCode, ArrowRight, Gift, Sparkles, Star } from "lucide-react"
import { PhotoGallery } from "@/components/photo-gallery"
import Navbar from "@/components/navbar"
import Snowfall from 'react-snowfall'
import { BlurFade } from "@/components/magicui/blur-fade"
import { useAnalytics } from "@/hooks/use-analytics"

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
  useAnalytics()
  
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
        color="white"
        style={{ background: 'transparent' }}
        snowflakeCount={80}
      />
      
      {/* Hero Section */}
      <section className="relative z-20 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <BlurFade delay={0.1}>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-white/90 font-medium">Baile de Inverno</span>
              </div>
            </BlurFade>
            
            <BlurFade delay={0.2}>
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
                <span className="winter-text-gradient bg-clip-text text-transparent">
                  Carol
                </span>
                <br />
                <span className="text-white/95 text-5xl md:text-6xl font-light">15 Anos</span>
              </h1>
            </BlurFade>
            
            <BlurFade delay={0.3}>
              <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
                Uma noite mágica de festa, dança e momentos inesquecíveis
              </p>
            </BlurFade>
            
            {/* Event Details */}
            <BlurFade delay={0.4}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-white text-lg">Data</p>
                        <p className="text-white/80">21 de Novembro, 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-white text-lg">Horário</p>
                        <p className="text-white/80">21:00 às 02:00</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-white text-lg">Local</p>
                        <p className="text-white/80">Av. Brás de Pina, 1867</p>
                        <p className="text-white/80 text-sm">Vista Alegre, Rio de Janeiro</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </BlurFade>

            <BlurFade delay={0.5}>
              <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-3">
                  <Star className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">Dress Code</h3>
                    <p className="text-white/80">Esporte Fino</p>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Pix Section */}
      <section className="relative z-20 py-24 bg-gradient-to-b from-transparent to-black/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <BlurFade delay={0.1}>
              <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-primary/30">
                <Gift className="h-5 w-5 text-primary" />
                <span className="text-primary font-medium">Presente Especial</span>
              </div>
            </BlurFade>
            
            <BlurFade delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Vai me dar presente?
              </h2>
            </BlurFade>
            
            <BlurFade delay={0.3}>
              <p className="text-2xl text-primary font-semibold mb-4">
                Manda um pix!
              </p>
            </BlurFade>
            
            <BlurFade delay={0.4}>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                É só usar o número de celular (21) 972629125 ou o QR Code.
              </p>
            </BlurFade>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            {/* QR Code */}
            <BlurFade delay={0.5}>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105">
                  <div className="w-56 h-56 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 hover:border-white/40 transition-all duration-300">
                    <QrCode className="h-32 w-32 text-white/60" />
                  </div>
                  <p className="text-center text-white/60 mt-6 font-medium">QR Code Pix</p>
                </div>
              </div>
            </BlurFade>

            {/* Phone Number */}
            <BlurFade delay={0.6}>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Gift className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4">Número do Pix</h3>
                    <p className="text-3xl font-bold text-primary mb-2">(21) 972629125</p>
                    <p className="text-white/60 font-medium">Carol</p>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>

          {/* Gift List Link */}
          <BlurFade delay={0.7}>
            <div className="text-center mt-16">
              <Button asChild className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105">
                <a href="/lista">
                  <Gift className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  Ver Lista Completa de Presentes
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </Button>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="relative z-20 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <BlurFade delay={0.1}>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
                <Camera className="h-5 w-5 text-primary" />
                <span className="text-white/90 font-medium">Galeria de Fotos</span>
              </div>
            </BlurFade>
            
            <BlurFade delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Fotos da Carol
              </h2>
            </BlurFade>
            
            <BlurFade delay={0.3}>
              <p className="text-white/80 text-xl max-w-3xl mx-auto leading-relaxed">
                Momentos especiais da nossa aniversariante que fazem parte dessa história incrível
              </p>
            </BlurFade>
          </div>

          <BlurFade delay={0.4}>
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <PhotoGallery images={images} />
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Confirmation Form Section */}
      <section className="relative z-20 py-24 bg-gradient-to-t from-transparent to-black/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.1}>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-primary/30">
                <Heart className="h-5 w-5 text-primary" />
                <span className="text-primary font-medium">Confirmação</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Confirme sua Presença
              </h2>
              
              <p className="text-white/80 text-xl max-w-3xl mx-auto leading-relaxed">
                Ajude-nos a organizar essa festa especial confirmando sua presença
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.2}>
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <Card className="relative bg-white/10 backdrop-blur-sm shadow-2xl border-white/20 hover:border-white/30 transition-all duration-300 rounded-3xl overflow-hidden">
                <CardContent className="p-12">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-white uppercase tracking-wide">Nome Completo</label>
                        <Input
                          type="text"
                          placeholder="Seu nome completo"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary focus:ring-primary h-14 text-lg rounded-xl"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-white uppercase tracking-wide">Telefone</label>
                        <Input
                          type="tel"
                          placeholder="(21) 99999-9999"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary focus:ring-primary h-14 text-lg rounded-xl"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-white uppercase tracking-wide">E-mail</label>
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary focus:ring-primary h-14 text-lg rounded-xl"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-white uppercase tracking-wide">Número de Pessoas</label>
                        <Select 
                          value={formData.familyNumber.toString()} 
                          onValueChange={(value) => setFormData({...formData, familyNumber: parseInt(value)})}
                        >
                          <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-primary focus:ring-primary h-14 text-lg rounded-xl">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-white/20 rounded-xl">
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                              <SelectItem key={num} value={num.toString()} className="rounded-lg">
                                {num} {num === 1 ? 'pessoa' : 'pessoas'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-white uppercase tracking-wide">Confirmação</label>
                        <div className="flex gap-6 pt-2">
                          <label className="flex items-center space-x-3 cursor-pointer group">
                            <input
                              type="radio"
                              name="status"
                              value="CONFIRMED"
                              checked={formData.status === "CONFIRMED" || formData.status === ""}
                              onChange={(e) => setFormData({...formData, status: e.target.value})}
                              className="text-primary focus:ring-primary border-white/20 w-5 h-5"
                            />
                            <span className="text-white group-hover:text-primary transition-colors duration-200 font-medium">Sim, vou comparecer</span>
                          </label>
                          <label className="flex items-center space-x-3 cursor-pointer group">
                            <input
                              type="radio"
                              name="status"
                              value="REJECTED"
                              checked={formData.status === "REJECTED"}
                              onChange={(e) => setFormData({...formData, status: e.target.value})}
                              className="text-primary focus:ring-primary border-white/20 w-5 h-5"
                            />
                            <span className="text-white group-hover:text-primary transition-colors duration-200 font-medium">Não poderei ir</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-white uppercase tracking-wide">Mensagem (opcional)</label>
                      <Textarea
                        placeholder="Deixe uma mensagem especial para a Carol..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        rows={5}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary focus:ring-primary text-lg rounded-xl resize-none"
                      />
                    </div>
                    
                    <div className="text-center pt-8">
                                            <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="group bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-4 text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Enviando...
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <Heart className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                            Confirmar Presença
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 bg-black/30 backdrop-blur-sm border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Star className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold text-white">Carol 15 Anos</h3>
            <Star className="h-6 w-6 text-primary" />
          </div>
          <p className="text-xl text-white/90 mb-4">
            Com muito carinho, família da Carol
          </p>
          <p className="text-white/60 text-lg">
            Uma celebração especial dos 15 anos - Baile de Inverno
          </p>
        </div>
      </footer>
    </div>
  )
} 