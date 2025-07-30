"use client"

import { MapPin, Navigation, Clock, Car } from "lucide-react"
import { BlurFade } from "@/components/magicui/blur-fade"
import { GoogleMapsComponent } from "@/components/google-maps"

export function GoogleMapsSection() {
  return (
    <section id="location" className="relative z-20 py-20 bg-gradient-to-b from-transparent to-black/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <BlurFade delay={0.1}>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-blue-400/20 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-primary/30 shadow-lg">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-white font-semibold text-sm tracking-wide">Localização</span>
            </div>
          </BlurFade>
          
          <BlurFade delay={0.2}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white via-primary to-blue-400 bg-clip-text text-transparent">
                Como Chegar
              </span>
            </h2>
          </BlurFade>
          
          <BlurFade delay={0.3}>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
              Veja a localização exata da Casa de Festa Royalle e planeje sua chegada
            </p>
          </BlurFade>
        </div>

        {/* Location Info */}
        <BlurFade delay={0.4}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="flex items-center space-x-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-blue-400/20 rounded-full flex items-center justify-center border border-primary/30">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-white font-semibold">Casa de Festa Royalle</p>
                <p className="text-white/60 text-sm">Endereço completo</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-blue-400/20 rounded-full flex items-center justify-center border border-primary/30">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-white font-semibold">21h em ponto</p>
                <p className="text-white/60 text-sm">Chegue com antecedência</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-blue-400/20 rounded-full flex items-center justify-center border border-primary/30">
                <Car className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-white font-semibold">Estacionamento</p>
                <p className="text-white/60 text-sm">Disponível no local</p>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Map Container */}
        <BlurFade delay={0.5}>
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-primary/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-blue-400/10 rounded-full blur-2xl"></div>
            
            <div className="bg-gradient-to-br from-white/10 to-primary/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl">
              <GoogleMapsComponent />
            </div>
          </div>
        </BlurFade>

        {/* Bottom decoration */}
        <BlurFade delay={0.6}>
          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-4 text-white/60">
              <Navigation className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-medium">Não se perca! Use o GPS</span>
              <MapPin className="h-4 w-4 text-primary animate-pulse" />
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}