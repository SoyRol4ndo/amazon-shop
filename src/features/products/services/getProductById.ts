import { dummyjson } from '@/src/shared/api/dummyjson'
import type { Product } from '@/src/shared/types/dummyjson'

export async function getProductById(id: number): Promise<Product> {
  const { data } = await dummyjson.get<Product>(`/products/${id}`)
  return data
}
