import { prisma } from "@/lib/prisma"
import HomeClient from "./page-client"

export default async function Home() {
  try {
    // Fetch images from database
    const images = await prisma.images.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        <HomeClient images={images} />
      </div>
    )
  } catch (error) {
    console.error('Error loading home page:', error)
    
    // Return a fallback UI if there's an error
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        <HomeClient images={[]} />
      </div>
    )
  }
}
