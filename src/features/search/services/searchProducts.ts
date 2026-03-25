import { dummyjson } from '@/src/shared/api/dummyjson'
import type { Product, ProductsResponse } from '@/src/shared/types/dummyjson'

export async function searchProducts(query: string, limit = 20): Promise<Product[]> {
  if (!query.trim()) return []

  const { data } = await dummyjson.get<ProductsResponse>('/products/search', {
    params: { q: query.trim(), limit },
  })

  return data.products
}
