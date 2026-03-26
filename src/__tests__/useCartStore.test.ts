import { useCartStore } from '@/src/features/cart/store/useCartStore'
import { mockProduct, mockProduct2 } from './__mocks__/product.mock'

// Resetea el store antes de cada test
beforeEach(() => {
  useCartStore.setState({ items: [] })
})

describe('useCartStore', () => {
  describe('addItem', () => {
    it('agrega un producto nuevo con quantity 1', () => {
      useCartStore.getState().addItem(mockProduct)

      const { items } = useCartStore.getState()
      expect(items).toHaveLength(1)
      expect(items[0].id).toBe(mockProduct.id)
      expect(items[0].quantity).toBe(1)
    })

    it('incrementa la cantidad si el producto ya existe', () => {
      useCartStore.getState().addItem(mockProduct)
      useCartStore.getState().addItem(mockProduct)

      const { items } = useCartStore.getState()
      expect(items).toHaveLength(1)
      expect(items[0].quantity).toBe(2)
    })

    it('puede agregar productos distintos por separado', () => {
      useCartStore.getState().addItem(mockProduct)
      useCartStore.getState().addItem(mockProduct2)

      const { items } = useCartStore.getState()
      expect(items).toHaveLength(2)
    })
  })

  describe('removeItem', () => {
    it('elimina el producto del carrito', () => {
      useCartStore.getState().addItem(mockProduct)
      useCartStore.getState().removeItem(mockProduct.id)

      expect(useCartStore.getState().items).toHaveLength(0)
    })

    it('no afecta otros productos al eliminar uno', () => {
      useCartStore.getState().addItem(mockProduct)
      useCartStore.getState().addItem(mockProduct2)
      useCartStore.getState().removeItem(mockProduct.id)

      const { items } = useCartStore.getState()
      expect(items).toHaveLength(1)
      expect(items[0].id).toBe(mockProduct2.id)
    })
  })

  describe('updateQuantity', () => {
    it('actualiza la cantidad del producto', () => {
      useCartStore.getState().addItem(mockProduct)
      useCartStore.getState().updateQuantity(mockProduct.id, 5)

      expect(useCartStore.getState().items[0].quantity).toBe(5)
    })

    it('elimina el producto si la cantidad es menor a 1', () => {
      useCartStore.getState().addItem(mockProduct)
      useCartStore.getState().updateQuantity(mockProduct.id, 0)

      expect(useCartStore.getState().items).toHaveLength(0)
    })
  })

  describe('clearCart', () => {
    it('vacía todos los productos del carrito', () => {
      useCartStore.getState().addItem(mockProduct)
      useCartStore.getState().addItem(mockProduct2)
      useCartStore.getState().clearCart()

      expect(useCartStore.getState().items).toHaveLength(0)
    })
  })

  describe('totalItems', () => {
    it('retorna 0 cuando el carrito está vacío', () => {
      expect(useCartStore.getState().totalItems()).toBe(0)
    })

    it('retorna la suma de las cantidades', () => {
      useCartStore.getState().addItem(mockProduct)
      useCartStore.getState().addItem(mockProduct)  // quantity = 2
      useCartStore.getState().addItem(mockProduct2) // quantity = 1

      expect(useCartStore.getState().totalItems()).toBe(3)
    })
  })

  describe('totalPrice', () => {
    it('retorna 0 cuando el carrito está vacío', () => {
      expect(useCartStore.getState().totalPrice()).toBe(0)
    })

    it('calcula el precio con descuento aplicado', () => {
      useCartStore.getState().addItem(mockProduct)

      const expectedPrice = mockProduct.price * (1 - mockProduct.discountPercentage / 100)
      expect(useCartStore.getState().totalPrice()).toBeCloseTo(expectedPrice, 2)
    })

    it('suma el total de varios productos', () => {
      useCartStore.getState().addItem(mockProduct)
      useCartStore.getState().addItem(mockProduct2)

      const price1 = mockProduct.price * (1 - mockProduct.discountPercentage / 100)
      const price2 = mockProduct2.price * (1 - mockProduct2.discountPercentage / 100)
      expect(useCartStore.getState().totalPrice()).toBeCloseTo(price1 + price2, 2)
    })
  })

  describe('isAdded', () => {
    it('retorna false si el producto no está en el carrito', () => {
      expect(useCartStore.getState().isAdded(mockProduct.id)).toBe(false)
    })

    it('retorna true si el producto está en el carrito', () => {
      useCartStore.getState().addItem(mockProduct)
      expect(useCartStore.getState().isAdded(mockProduct.id)).toBe(true)
    })
  })
})
