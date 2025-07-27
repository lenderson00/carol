"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Gift, Home } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Home */}
          <Link href="/" className="flex items-center space-x-2 text-white hover:text-primary transition-colors">
            <Heart className="h-6 w-6" />
            <span className="font-semibold text-lg">Carol 15 Anos</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white hover:text-primary hover:bg-white/10">
                <Home className="h-4 w-4 mr-2" />
                Início
              </Button>
            </Link>
            <Link href="/lista">
              <Button variant="ghost" size="sm" className="text-white hover:text-primary hover:bg-white/10">
                <Gift className="h-4 w-4 mr-2" />
                Lista de Presentes
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 