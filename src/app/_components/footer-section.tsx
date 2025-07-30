"use client"

import { Star, Heart, Sparkles } from "lucide-react"

export function FooterSection() {
  return (
    <footer className="relative z-20 bg-gradient-to-t from-black/40 to-black/20 backdrop-blur-md border-t border-white/10 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main content */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Star className="h-6 w-6 text-primary animate-pulse" />
              <h3 className="text-3xl sm:text-4xl font-bold text-white">
                <span className="bg-gradient-to-r from-white via-primary to-blue-400 bg-clip-text text-transparent">
                  Ana Carolina 15 Anos
                </span>
              </h3>
              <Star className="h-6 w-6 text-primary animate-pulse" />
            </div>
            
            <p className="text-lg sm:text-xl text-white/90 mb-4 font-light leading-relaxed">
              A família da Ana Carolina lhe envia esse convite com muito carinho
            </p>
            
            <p className="text-white/70 text-base sm:text-lg font-light">
              Uma celebração especial dos 15 anos - Baile de Inverno
            </p>
          </div>

          {/* Decorative elements */}
          <div className="flex items-center justify-center space-x-6 mb-8">
            <div className="w-1 h-1 bg-primary rounded-full"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="w-1 h-1 bg-primary rounded-full"></div>
          </div>

          {/* Bottom message */}
          <div className="flex items-center justify-center space-x-2 text-white/60">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Que seja uma noite inesquecível</span>
            <Heart className="h-4 w-4 text-primary animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  )
}