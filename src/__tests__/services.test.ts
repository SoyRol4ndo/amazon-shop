import { dummyjson } from '@/src/shared/api/dummyjson'
import { getProductById } from '@/src/features/products/services/getProductById'
import { getCategories } from '@/src/features/products/services/getCategories'
import { getProductsByCategory } from '@/src/features/products/services/getProductsByCategory'
import { searchProducts } from '@/src/features/search/services/searchProducts'
import { mockProduct, mockProduct2 } from './__mocks__/product.mock'
import type { Category } from '@/src/shared/types/dummyjson'

// Mock del cliente axios
jest.mock('@/src/shared/api/dummyjson', () => ({
  dummyjson: {
    get: jest.fn(),
  },
}))

const mockedGet = dummyjson.get as jest.MockedFunction<typeof dummyjson.get>

beforeEach(() => {
  jest.clearAllMocks()
})

// ─── getProductById ─────────────────────────────────────────────────────────

describe('getProductById', () => {
  it('retorna el producto correctamente', async () => {
    mockedGet.mockResolvedValueOnce({ data: mockProduct } as never)

    const result = await getProductById(1)

    expect(mockedGet).toHaveBeenCalledWith('/products/1')
    expect(result).toEqual(mockProduct)
  })

  it('lanza error si la petición falla', async () => {
    mockedGet.mockRejectedValueOnce(new Error('Network Error'))

    await expect(getProductById(999)).rejects.toThrow('Network Error')
  })
})

// ─── getCategories ───────────────────────────────────────────────────────────

describe('getCategories', () => {
  const mockCategories: Category[] = [
    { slug: 'smartphones', name: 'Smartphones', url: 'https://dummyjson.com/products/category/smartphones' },
    { slug: 'laptops', name: 'Laptops', url: 'https://dummyjson.com/products/category/laptops' },
  ]

  it('retorna el array de categorías', async () => {
    mockedGet.mockResolvedValueOnce({ data: mockCategories } as never)

    const result = await getCategories()

    expect(mockedGet).toHaveBeenCalledWith('/products/categories')
    expect(result).toEqual(mockCategories)
    expect(result).toHaveLength(2)
  })
})

// ─── getProductsByCategory ───────────────────────────────────────────────────

describe('getProductsByCategory', () => {
  it('retorna los productos de la categoría', async () => {
    const mockResponse = {
      products: [mockProduct, mockProduct2],
      total: 2,
      skip: 0,
      limit: 20,
    }
    mockedGet.mockResolvedValueOnce({ data: mockResponse } as never)

    const result = await getProductsByCategory('smartphones', 20)

    expect(mockedGet).toHaveBeenCalledWith('/products/category/smartphones', expect.objectContaining({
      params: { limit: 20 },
    }))
    expect(result).toEqual([mockProduct, mockProduct2])
  })
})

// ─── searchProducts ──────────────────────────────────────────────────────────

describe('searchProducts', () => {
  it('retorna los productos encontrados', async () => {
    const mockResponse = {
      products: [mockProduct],
      total: 1,
      skip: 0,
      limit: 20,
    }
    mockedGet.mockResolvedValueOnce({ data: mockResponse } as never)

    const result = await searchProducts('iphone')

    expect(mockedGet).toHaveBeenCalledWith('/products/search', expect.objectContaining({
      params: { q: 'iphone', limit: 20 },
    }))
    expect(result).toEqual([mockProduct])
  })

  it('retorna array vacío si la query está vacía', async () => {
    const result = await searchProducts('   ')

    expect(mockedGet).not.toHaveBeenCalled()
    expect(result).toEqual([])
  })

  it('recorta espacios de la query antes de enviarla', async () => {
    const mockResponse = { products: [mockProduct], total: 1, skip: 0, limit: 20 }
    mockedGet.mockResolvedValueOnce({ data: mockResponse } as never)

    await searchProducts('  iphone  ')

    expect(mockedGet).toHaveBeenCalledWith('/products/search', expect.objectContaining({
      params: { q: 'iphone', limit: 20 },
    }))
  })
})
