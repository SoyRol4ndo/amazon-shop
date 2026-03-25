import { dummyjson } from '@/src/shared/api/dummyjson'
import type { Category } from '@/src/shared/types/dummyjson'

export async function getCategories(): Promise<Category[]> {
  const { data } = await dummyjson.get<Category[]>('/products/categories')
  return data
}
