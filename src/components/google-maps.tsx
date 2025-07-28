"use client"

import { MapPin } from 'lucide-react'
import { useMemo } from 'react'

interface GoogleMapsComponentProps {
  coordinates?: string
  zoom?: number
  className?: string
}

const coordinatesRegex = /^((?:\-?|\+?)?\d+(?:\.\d+)?),\s*((?:\-?|\+?)?\d+(?:\.\d+)?)$/

export function GoogleMapsComponent({ 
  coordinates = "-22.835828862190127, -43.318102147835475",
  zoom = 16,
  className = ""
}: GoogleMapsComponentProps) {
  const [latitude, longitude] = useMemo(() => {
    const [, lat, lng] = coordinates.match(coordinatesRegex) ?? [
      null,
      "",
      "",
    ]
    return [lat, lng]
  }, [coordinates])

  const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=${zoom}&output=embed`

  return (
    <div className={`group relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
      <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300">
        <div className="mb-6 text-center">
          <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-white mb-2">Local da Festa</h3>
          <p className="text-white/80 text-lg">Casa de Festa Royalle</p>
        </div>
        
        <div className="relative overflow-hidden rounded-2xl">
          <iframe
            src={mapUrl}
            style={{
              height: "400px",
              width: "100%",
              border: 0,
              borderRadius: "16px"
            }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização da Casa de Festa Royalle"
            aria-label="Mapa mostrando a localização da Casa de Festa Royalle"
          />
        </div>
      </div>
    </div>
  )
}