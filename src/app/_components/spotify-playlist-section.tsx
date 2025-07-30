"use client"

import { Music, Play, Heart } from "lucide-react"
import { BlurFade } from "@/components/magicui/blur-fade"

export function SpotifyPlaylistSection() {
  return (
    <section id="music" className="relative z-20 py-20 bg-gradient-to-b from-black/5 to-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <BlurFade delay={0.1}>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-blue-400/20 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-primary/30 shadow-lg">
              <Music className="h-5 w-5 text-primary" />
              <span className="text-white font-semibold text-sm tracking-wide">Playlist da Festa</span>
            </div>
          </BlurFade>
          
          <BlurFade delay={0.2}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white via-primary to-blue-400 bg-clip-text text-transparent">
                Música para Dançar
              </span>
            </h2>
          </BlurFade>
          
          <BlurFade delay={0.3}>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
              Ouça nossa playlist especial e prepare-se para uma noite de muita dança e diversão
            </p>
          </BlurFade>
        </div>

        {/* Playlist Container */}
        <BlurFade delay={0.4}>
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-primary/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-blue-400/10 rounded-full blur-2xl"></div>
            
            <div className="bg-gradient-to-br from-white/10 to-primary/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl">
              <div className="flex justify-center">
                <iframe
                  style={{ borderRadius: '16px' }}
                  src="https://open.spotify.com/embed/playlist/20F04qYomalZx1WoSiSyCy?utm_source=generator&theme=0"
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Bottom decoration */}
        <BlurFade delay={0.5}>
          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-4 text-white/60">
              <Play className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-medium">Prepare-se para dançar muito!</span>
              <Heart className="h-4 w-4 text-primary animate-pulse" />
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}