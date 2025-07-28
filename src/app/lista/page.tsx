import { prisma } from "@/lib/prisma"
import ListaClient from "./page-client"

async function getGifts() {
  try {
    const gifts = await prisma.gift.findMany({
      include: {
        category: true,
      },
      orderBy: {
        category: {
          name: 'asc',
        },
      },
    })
    return gifts
  } catch (error) {
    console.error('Error fetching gifts:', error)
    return []
  }
}

async function getCategories() {
  try {
    const categories = await prisma.giftCategory.findMany({
      include: {
        _count: {
          select: {
            gifts: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })
    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export default async function ListaPage() {
  const gifts = await getGifts()
  const categories = await getCategories()

  // Group gifts by category
  const giftsByCategory = categories.map(category => ({
    ...category,
    gifts: gifts.filter(gift => gift.categoryId === category.id)
  }))

  // Add empty gifts array to categories for the client component
  const categoriesWithGifts = categories.map(category => ({
    ...category,
    gifts: []
  }))

  return <ListaClient giftsByCategory={giftsByCategory} categories={categoriesWithGifts} />
}