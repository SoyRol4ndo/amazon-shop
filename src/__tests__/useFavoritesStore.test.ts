import { useFavoritesStore } from '@/src/features/favorites/store/useFavoritesStore'
import { mockProduct, mockProduct2 } from './__mocks__/product.mock'

beforeEach(() => {
  useFavoritesStore.setState({ items: [] })
})

describe('useFavoritesStore', () => {
  describe('addItem', () => {
    it('agrega un producto a favoritos', () => {
      useFavoritesStore.getState().addItem(mockProduct)

      const { items } = useFavoritesStore.getState()
      expect(items).toHaveLength(1)
      expect(items[0].id).toBe(mockProduct.id)
    })

    it('no agrega duplicados', () => {
      useFavoritesStore.getState().addItem(mockProduct)
      useFavoritesStore.getState().addItem(mockProduct)

      expect(useFavoritesStore.getState().items).toHaveLength(1)
    })

    it('puede agregar productos distintos', () => {
      useFavoritesStore.getState().addItem(mockProduct)
      useFavoritesStore.getState().addItem(mockProduct2)

      expect(useFavoritesStore.getState().items).toHaveLength(2)
    })
  })

  describe('removeItem', () => {
    it('elimina el producto de favoritos', () => {
      useFavoritesStore.getState().addItem(mockProduct)
      useFavoritesStore.getState().removeItem(mockProduct.id)

      expect(useFavoritesStore.getState().items).toHaveLength(0)
    })

    it('no afecta otros favoritos al eliminar uno', () => {
      useFavoritesStore.getState().addItem(mockProduct)
      useFavoritesStore.getState().addItem(mockProduct2)
      useFavoritesStore.getState().removeItem(mockProduct.id)

      const { items } = useFavoritesStore.getState()
      expect(items).toHaveLength(1)
      expect(items[0].id).toBe(mockProduct2.id)
    })
  })

  describe('toggle', () => {
    it('agrega el producto si no es favorito', () => {
      useFavoritesStore.getState().toggle(mockProduct)

      expect(useFavoritesStore.getState().items).toHaveLength(1)
      expect(useFavoritesStore.getState().isFavorite(mockProduct.id)).toBe(true)
    })

    it('elimina el producto si ya es favorito', () => {
      useFavoritesStore.getState().addItem(mockProduct)
      useFavoritesStore.getState().toggle(mockProduct)

      expect(useFavoritesStore.getState().items).toHaveLength(0)
      expect(useFavoritesStore.getState().isFavorite(mockProduct.id)).toBe(false)
    })
  })

  describe('isFavorite', () => {
    it('retorna false si el producto no es favorito', () => {
      expect(useFavoritesStore.getState().isFavorite(mockProduct.id)).toBe(false)
    })

    it('retorna true si el producto es favorito', () => {
      useFavoritesStore.getState().addItem(mockProduct)
      expect(useFavoritesStore.getState().isFavorite(mockProduct.id)).toBe(true)
    })
  })
})
