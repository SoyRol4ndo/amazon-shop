import { CardSection } from "@/src/shared/ui/CardsSection";
import { searchProducts } from "@/src/features/search/services/searchProducts";
import type { Product } from "@/src/shared/types/dummyjson";

interface SearchPageProps {
  query: string;
}

export async function SearchPage({ query }: SearchPageProps) {
  let products: Product[] = [];
  let errorMsg: string | null = null;

  if (query.trim()) {
    try {
      products = await searchProducts(query);
    } catch (err) {
      errorMsg =
        err instanceof Error ? err.message : "Error al buscar productos.";
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 rounded-2xl bg-linear-to-r from-gray-900 to-gray-700 px-8 py-12 text-white">
        <h1 className="text-4xl font-bold">
          {query ? `"${query}"` : "Buscar productos"}
        </h1>
        <p className="mt-2 text-gray-300">
          {!query
            ? "Escribe algo en el buscador para encontrar productos"
            : products.length > 0
              ? `${products.length} resultados encontrados`
              : "Sin resultados para esta búsqueda"}
        </p>
      </div>

      {errorMsg ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-sm font-medium text-red-700">{errorMsg}</p>
          <p className="mt-1 text-xs text-red-500">
            Intenta recargar la página.
          </p>
        </div>
      ) : !query ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mb-4 opacity-40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p className="text-lg">¿Qué estás buscando?</p>
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mb-4 opacity-40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-lg">
            No encontramos resultados para{" "}
            <span className="font-semibold text-gray-600">{`"${query}"`}</span>
          </p>
          <p className="mt-1 text-sm">Intenta con otro término de búsqueda</p>
        </div>
      ) : (
        <CardSection products={products} />
      )}
    </div>
  );
}
