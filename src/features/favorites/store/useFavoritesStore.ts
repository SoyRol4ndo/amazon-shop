import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/src/shared/types/dummyjson'

interface FavoritesStore {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  toggle: (product: Product) => void
  isFavorite: (productId: number) => boolean
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          if (state.items.some((i) => i.id === product.id)) return state
          return { items: [...state.items, product] }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== productId),
        }))
      },

      toggle: (product) => {
        const isFav = get().isFavorite(product.id)
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        isFav ? get().removeItem(product.id) : get().addItem(product)
      },

      isFavorite: (productId) => get().items.some((i) => i.id === productId),
    }),
    { name: 'favorites' },
  ),
)
