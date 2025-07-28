"use client"

import * as React from "react"
import { MapPin, Gift, Home, Image, ExternalLink } from "lucide-react"
import { usePathname } from "next/navigation"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  // Navigation data with dynamic active state
  const navMain = [
    {
      title: "Visitar Página Inicial",
      url: "/",
      icon: ExternalLink,
      isActive: pathname === "/",
      items: [],
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: pathname === "/dashboard",
      items: [],
    },
    {
      title: "Imagens",
      url: "/dashboard/images",
      icon: Image,
      isActive: pathname === "/dashboard/images",
      items: [],
    },
    {
      title: "Confirmações",
      url: "/dashboard/confirmacoes",
      icon: MapPin,
      isActive: pathname === "/dashboard/confirmacoes",
      items: [],
    },
    {
      title: "Presentes",
      url: "/dashboard/presentes",
      icon: Gift,
      isActive: pathname === "/dashboard/presentes",
      items: [],
    },
  ]

  const user = {
    name: "Niver da Ana Carolina",
    username: "Administrador",
    avatar: "/avatars/shadcn.jpg",
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
