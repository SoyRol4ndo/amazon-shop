import { getProductsByCategory } from "../services/getProductsByCategory";

export const fetchCategoryData = async (slug: string) => {
  try {
    const data = await getProductsByCategory(slug, 20);
  return {products: data, errorMsg: null}
  } catch (error) {
    return {
      products: [],
      errorMsg: error instanceof Error ? error.message : "No se pudieron cargar los productos.",
    }
  }
}