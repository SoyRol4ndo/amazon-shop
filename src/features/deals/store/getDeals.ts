import { dummyjson } from '@/src/shared/api/dummyjson'
import type { Product, ProductsResponse } from '@/src/shared/types/dummyjson'

export async function getDeals(limit = 20): Promise<Product[]> {
  const { data } = await dummyjson.get<ProductsResponse>('/products', {
    params: { limit },
  })

  return data.products
}
