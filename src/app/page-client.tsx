"use client"

import { useAnalytics } from "@/hooks/use-analytics"
import Navbar from "@/components/navbar"
import Snowfall from 'react-snowfall'
import { HeroSection } from "./_components/hero-section"
import { PhotoGallerySection } from "./_components/photo-gallery-section"
import { ConfirmationFormSection } from "./_components/confirmation-form-section"
import { SpotifyPlaylistSection } from "./_components/spotify-playlist-section"
import { GoogleMapsSection } from "./_components/google-maps-section"
import { FooterSection } from "./_components/footer-section"

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

  // Create snowflake image element
  const snowflakeImage = document.createElement('img')
  snowflakeImage.src = '/assets/snowflake.png'
  const images_snowfall = [snowflakeImage]

  return (
    <div className="min-h-screen winter-gradient relative overflow-hidden">
      <Navbar />
      <Snowfall
        style={{ background: 'transparent', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000 }}
        snowflakeCount={75}
        images={images_snowfall}
        radius={[5, 20]}
        opacity={[0.5, 1]}
      />
      
      <HeroSection />
      <PhotoGallerySection images={images} />
      <ConfirmationFormSection />
      <SpotifyPlaylistSection />
      <GoogleMapsSection />
      <FooterSection />
    </div>
  )
} 