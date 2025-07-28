"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Gift, Home, Menu, X, Settings } from "lucide-react"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession()
  const { scrollY } = useScroll()
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"]
  )
  
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(12px)"]
  )

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/20"
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Home */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/" className="flex items-center space-x-2 text-white hover:text-primary transition-colors">
              <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="font-semibold text-base sm:text-lg">Ana Carolina 15 Anos</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation Links */}
          <motion.div 
            className="hidden md:flex items-center space-x-4"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
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
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:text-primary transition-colors"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white/10 backdrop-blur-md border-t border-white/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
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
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
} 