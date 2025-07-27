"use client"

import * as React from "react"
import { Building2, MapPin, Gift } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"

// Simplified data for the property management application
const data = {
  user: {
    name: "Niver da Carol",
    username: "Administrador",
    avatar: "/avatars/shadcn.jpg", // Placeholder avatar
  },
  navMain: [
    {
      title: "Imagens",
      url: "/dashboard",
      icon: Building2,
      isActive: true,
      items: [], // No sub-items for a cleaner look
    },
    {
      title: "Confirmações",
      url: "/dashboard/confirmacoes",
      icon: MapPin,
      isActive: false,
      items: [],
    },
    {
      title: "Presentes",
      url: "/dashboard/presentes",
      icon: Gift,
      isActive: false,
      items: [],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* The header is removed for a cleaner look as it's not needed */}
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
