"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Gift, Home, Menu, X, Settings } from "lucide-react"
import { useState } from "react"
import { useSession } from "next-auth/react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Home */}
          <Link href="/" className="flex items-center space-x-2 text-white hover:text-primary transition-colors">
            <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="font-semibold text-base sm:text-lg">Carol 15 Anos</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
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
            {session && (
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-white hover:text-primary hover:bg-white/10">
                  <Settings className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-md border-t border-white/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start text-white hover:text-primary hover:bg-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Início
                </Button>
              </Link>
              <Link href="/lista">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start text-white hover:text-primary hover:bg-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Gift className="h-4 w-4 mr-2" />
                  Lista de Presentes
                </Button>
              </Link>
              {session && (
                <Link href="/dashboard">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start text-white hover:text-primary hover:bg-white/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 