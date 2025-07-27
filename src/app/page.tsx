import { prisma } from "@/lib/prisma"
import HomeClient from "./page-client"

export default async function Home() {
  // Fetch images from database
  const images = await prisma.images.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  return <div className="min-h-screen bg-black relative overflow-hidden"><HomeClient images={images} /></div>
}
