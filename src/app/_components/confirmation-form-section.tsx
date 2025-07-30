"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { Heart } from "lucide-react"
import { BlurFade } from "@/components/magicui/blur-fade"

export function ConfirmationFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
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
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-xl transition-all duration-500"></div>
            <Card className="relative bg-white/10 backdrop-blur-sm shadow-2xl border-white/20 transition-all duration-300 rounded-3xl overflow-hidden hover:bg-white/15">
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
                        <span className="text-white transition-colors duration-200 font-medium">Sim, vou comparecer</span>
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
                        <span className="text-white transition-colors duration-200 font-medium">Infelizmente não poderei estar presente</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-white uppercase tracking-wide">Mensagem (opcional)</label>
                    <Textarea
                      placeholder="Deixe uma mensagem especial para a Ana Carolina..."
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
                      className="group bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-4 text-xl font-semibold rounded-2xl shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Enviando...
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Heart className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
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
  )
}