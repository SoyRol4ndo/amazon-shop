import { dummyjson } from '@/src/shared/api/dummyjson'
import type { Product, ProductsResponse } from '@/src/shared/types/dummyjson'

export async function getProductsByCategory(
  slug: string,
  limit = 20,
): Promise<Product[]> {
  const { data } = await dummyjson.get<ProductsResponse>(
    `/products/category/${slug}`,
    { params: { limit } },
  )

  return data.products
}
