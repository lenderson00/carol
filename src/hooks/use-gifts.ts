import { useState, useEffect } from 'react'

interface Gift {
  id: string
  name: string
  image: string
  description?: string
  categoryId: string
  category: {
    id: string
    name: string
    color: string
  }
  createdAt: string
  updatedAt: string
}

interface Category {
  id: string
  name: string
  color: string
  _count: {
    gifts: number
  }
}

export function useGifts() {
  const [gifts, setGifts] = useState<Gift[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchGifts = async () => {
    try {
      const response = await fetch('/api/gifts')
      if (!response.ok) throw new Error('Failed to fetch gifts')
      const data = await response.json()
      setGifts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch gifts')
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (!response.ok) throw new Error('Failed to fetch categories')
      const data = await response.json()
      setCategories(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch categories')
    }
  }

  const addGift = async (giftData: { name: string; image?: string; description?: string; categoryId: string }) => {
    try {
      const response = await fetch('/api/gifts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(giftData),
      })

      if (!response.ok) throw new Error('Failed to add gift')

      const newGift = await response.json()
      setGifts(prev => [newGift, ...prev])
      return newGift
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add gift')
      throw err
    }
  }

  const updateGift = async (id: string, giftData: { name: string; image?: string; description?: string; categoryId: string }) => {
    try {
      const response = await fetch(`/api/gifts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(giftData),
      })

      if (!response.ok) throw new Error('Failed to update gift')

      const updatedGift = await response.json()
      setGifts(prev => prev.map(gift => gift.id === id ? updatedGift : gift))
      return updatedGift
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update gift')
      throw err
    }
  }

  const deleteGift = async (id: string) => {
    try {
      const response = await fetch(`/api/gifts/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete gift')

      setGifts(prev => prev.filter(gift => gift.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete gift')
      throw err
    }
  }

  const addCategory = async (categoryData: { name: string; color: string }) => {
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      })

      if (!response.ok) throw new Error('Failed to add category')

      const newCategory = await response.json()
      setCategories(prev => [...prev, { ...newCategory, _count: { gifts: 0 } }])
      return newCategory
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add category')
      throw err
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await Promise.all([fetchGifts(), fetchCategories()])
      setLoading(false)
    }

    loadData()
  }, [])

  return {
    gifts,
    categories,
    loading,
    error,
    addGift,
    updateGift,
    deleteGift,
    addCategory,
    refetch: () => {
      setLoading(true)
      Promise.all([fetchGifts(), fetchCategories()]).finally(() => setLoading(false))
    }
  }
} 