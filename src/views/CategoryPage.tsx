import { CardSection } from "@/src/shared/ui/CardsSection";
import { getProductsByCategory } from "@/src/features/products/services/getProductsByCategory";
import type { Product } from "@/src/shared/types/dummyjson";

interface CategoryPageProps {
  slug: string;
}

export async function CategoryPage({ slug }: CategoryPageProps) {
  let products: Product[] = [];
  let errorMsg: string | null = null;

  try {
    products = await getProductsByCategory(slug, 20);
  } catch (err) {
    errorMsg =
      err instanceof Error
        ? err.message
        : "No se pudieron cargar los productos.";
  }

  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 rounded-2xl bg-linear-to-r from-gray-900 to-gray-700 px-8 py-12 text-white">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="mt-2 text-gray-300">
          {products.length > 0
            ? `${products.length} productos encontrados`
            : "Explorando productos"}
        </p>
      </div>

      {errorMsg ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-sm font-medium text-red-700">{errorMsg}</p>
          <p className="mt-1 text-xs text-red-500">
            Intenta recargar la página.
          </p>
        </div>
      ) : (
        <CardSection products={products} />
      )}
    </div>
  );
}
