import { dummyjson } from '@/src/shared/api/dummyjson'
import { getDeals } from '@/src/features/deals/store/getDeals'
import { mockProduct, mockProduct2 } from './__mocks__/product.mock'

jest.mock('@/src/shared/api/dummyjson', () => ({
  dummyjson: { get: jest.fn() },
}))

const mockedGet = dummyjson.get as jest.MockedFunction<typeof dummyjson.get>

beforeEach(() => {
  jest.clearAllMocks()
})

describe('getDeals', () => {
  it('retorna el array de productos', async () => {
    const mockResponse = {
      products: [mockProduct, mockProduct2],
      total: 2,
      skip: 0,
      limit: 20,
    }
    mockedGet.mockResolvedValueOnce({ data: mockResponse } as never)

    const result = await getDeals()

    expect(result).toEqual([mockProduct, mockProduct2])
  })

  it('llama a /products con el limit por defecto (20)', async () => {
    mockedGet.mockResolvedValueOnce({ data: { products: [], total: 0, skip: 0, limit: 20 } } as never)

    await getDeals()

    expect(mockedGet).toHaveBeenCalledWith('/products', { params: { limit: 20 } })
  })

  it('respeta el limit personalizado', async () => {
    mockedGet.mockResolvedValueOnce({ data: { products: [], total: 0, skip: 0, limit: 5 } } as never)

    await getDeals(5)

    expect(mockedGet).toHaveBeenCalledWith('/products', { params: { limit: 5 } })
  })

  it('lanza error si la petición falla', async () => {
    mockedGet.mockRejectedValueOnce(new Error('Network Error'))

    await expect(getDeals()).rejects.toThrow('Network Error')
  })
})
