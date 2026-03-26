import { CardSection } from "../shared/ui/CardsSection";
import { getDeals } from "../features/deals/store/getDeals";
import type { Product } from "../shared/types/dummyjson";

export const DealsPage = async () => {
  let products: Product[] = [];
  let errorMsg: string | null = null;

  try {
    products = await getDeals(20);
  } catch (err) {
    errorMsg =
      err instanceof Error ? err.message : "No se pudieron cargar las ofertas.";
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 rounded-2xl bg-linear-to-r from-gray-900 to-gray-700 px-8 py-12 text-white">
        <div className="flex justify-between">
          <div>
            <h1 className="text-4xl font-bold">Ofertas del día</h1>
            <p className="mt-2 text-gray-300">
              Los mejores precios, actualizados cada hora
            </p>
          </div>
          <div className="mr-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
              />
            </svg>
          </div>
        </div>
      </div>

      {errorMsg ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-sm font-medium text-red-700">{errorMsg}</p>
          <p className="mt-1 text-xs text-red-500">
            Intenta recargar la página en unos segundos.
          </p>
        </div>
      ) : (
        <CardSection products={products} />
      )}
    </div>
  );
};
