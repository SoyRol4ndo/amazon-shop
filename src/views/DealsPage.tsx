import { CardSection } from "../shared/ui/CardsSection";
import { getDeals } from "../features/deals/store/getDeals";
import { Banner } from "../shared/ui/Banner";
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
      <Banner
        title={"Ofertas del día"}
        subtitle="Los mejores precios, actualizados cada hora."
        hasIcon
      />

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
